from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from dotenv import load_dotenv
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate

# Create your views here.

template = """You have received text parsed from {ctx}. Your task is to output new text for a new PowerPoint presentation to be used for other age groups.
In order to generate new slides, I need you to output in an XML style format.
We will be generating the slides by using preset PowerPoint slide layouts. Each of these slide layouts has a list of placeholders that you will populate with text.
Here is an example of the XML style format, showing each of the 6 preset slide layouts:
<slides>
    <slide layout="title">
        <title>Slide Title</title>
        <subtitle>Slide Subtitle</subtitle>
    </slide>
    <slide layout="content">
        <title>Slide Title</title>
        <content>
			<b>Point 1</b>
			<b>Point 2</b>
		</content>
    </slide>
    <slide layout="header">
	    <title>Slide Title</title>
	    <text>Text</text>
    </slide>
    <slide layout="two">
	    <title>Slide Title</title>
	    <content>
			<b>Point 1</b>
			<b>Point 2</b>
		</content>
	    <content>
			<b>Point 1</b>
			<b>Point 2</b>
	    </content>
    </slide>
    <slide layout="comp">
	    <title>Slide Title</title>
	    <text>Left Side Title</text>
	    <content>
			<b>Point 1</b>
			<b>Point 2</b>
	    </content>
	    <text>Right Side Title</text>
	    <content>
			<b>Point 1</b>
			<b>Point 2</b>
	    </content>
    </slide>
    <slide layout="caption">
	    <title>Slide Title</title>
	    <content>
			<b>Point 1</b>
			<b>Point 2</b>
	    </content>
	    <text>Caption</text>
    </slide>
</slides>
Please note that you do not need to use every single layout preset, only use the preset you determine to be the most effective at displaying the information for a particular slide.

Here is a description of each of the slide layouts for you to determine their usefulness:
"title": A slide with a centered title and optional subtitle
"content": A slide with a title on top and a content body below
"header": Shorthand for section header. A slide used to signal a new section in the presentation, essentially the same as a title slide but styled differently
"two": Short for two-content, a slide with a title on top, and two side by side content bodies
"comp": Short for comparison, the same thing as a two content slide, but with a title for each side
"caption": A slide with a title and caption on the left side, and a main content body on the right

Please also note that a content placeholder displays text as bullet points for every new line, whereas title/subtitle/text do not, so you will need to wrap each bullet point with a <b></b> tag.

Using these preset slides and their placeholder components, please use the original materials and convert them into slides that can be can be used to teach a {targetGrade} class. Output only in the XML format. {prompt}."""

default_template = PromptTemplate.from_template(template)

@csrf_exempt
def ai(request):
    if (request.method == 'POST'):
        load_dotenv()
        uploaded_file = request.FILES.get('file')
        prompt = request.POST.get('prompt')
        ctx = request.POST.get('ctx')
        targetGrade = request.POST.get('targetGrade')

        # extract text
        pdf_reader = PdfReader(uploaded_file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
		
        # Split text into chunks
        text_splitter = CharacterTextSplitter(
            separator="\n",
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len
        )
		
        chunks = text_splitter.split_text(text)
        embeddings = OpenAIEmbeddings()
		
        knowledge_base = FAISS.from_texts(chunks, embeddings)
		
        if prompt:
            docs = knowledge_base.similarity_search(default_template.format(ctx=ctx, targetGrade=targetGrade, prompt=prompt))
            llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0.8)
            chain = load_qa_chain(llm, chain_type="stuff")
            response = chain.run(input_documents=docs, question=default_template.format(ctx=ctx, targetGrade=targetGrade, prompt=prompt))
            return JsonResponse({'response': response})
    return HttpResponse("Hello World")