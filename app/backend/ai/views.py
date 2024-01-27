from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from dotenv import load_dotenv
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain.llms import OpenAI
from langchain.vectorstores import FAISS
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
# from langchain.embeddings import GPT4AllEmbeddings

# Create your views here.

# default_template = PromptTemplate.from_template(
#     "This is text taken from university course lecture slides. From this original material, generate text for new slides that can be used to teach a {targetGrade} class. Output in a markdown format, denote a new slide with a tag of your choosing. {prompt}"
# )

default_template = PromptTemplate.from_template(
    """
    You will be receiving text parsed from {context}, and converting this into a new PowerPoint presentation to be used for other age groups. 

    We will be generating the slides by using preset PowerPoint slide layouts, and populating their placeholders with text. In order to do this, you need to output in a XML format, which I will explain now:

    There are 6 preset slide layouts that you have access to, here's each one with a list of their placeholders:
    Title Slide (A slide with a centered title and optional subtitle):
    Identifier: "title"
    Placeholder 0: Title
    Placeholder 1: Subtitle

    Title and Content Slide (A slide with a title on top and a content body below):
    Identifier: "content"
    Placeholder 0: Title
    Placeholder 1: Content

    Section Header Slide (A slide used to signal a new section in the presentation, essentially the same as a title slide but styled differently):
    Identifier: "header"
    Placeholder 0: Title
    Placeholder 1: Text

    Two Content Slide (A slide with a title on top, and two side by side content bodies):
    Identifier: "two"
    Placeholder 0: Title
    Placeholder 1: Left Side Content
    Placeholder 2: Right Side Content

    Comparison Slide (The same thing as a two content slide, but with a title for each side): 
    Identifier: "comp"
    Placeholder 0: Title
    Placeholder 1: Left Side Text (title)
    Placeholder 2: Left Side Content
    Placeholder 3: Right Side Text (title)
    Placeholder 4: Right Side Content

    Content with Caption Slide (A slide with a title and caption on the left side, and a main content body on the right):
    Identifier: "caption"
    Placeholder 0: Title
    Placeholder 1: Content Placeholder
    Placeholder 2: Text Placeholder

    Please note that a content placeholder displays text as bullet points for every new line, whereas title/subtitle/text do not. 

    The following is an example of each of the preset slides using the required XML formatting:
    <slides>
        <slide layout="title">
            <title>Slide 1 Title</title>
            <subtitle>Slide 1 Subtitle</subtitle>
        </slide>
        <slide layout="content">
            <title>Slide 2 Title</title>
            <content>This is a content component</content>
        </slide>
        <slide layout="header">
            <title>Slide 3 Title</title>
            <text>Slide 3 Text</text>
        </slide>
        <slide layout="two">
            <title>Slide 4 Title</title>
            <content>Slide 4 Left Content</content>
            <content>Slide 4 Right Content</content>
        </slide>
        <slide layout="comp">
            <title>Slide 5 Title</title>
            <text>Left Side Title</text>
            <content>Left Side Content</content>
            <text>Right Side Title</text>
            <content>Right Side Content</content>
        </slide>
        <slide layout="caption">
            <title>Slide 6 Title</title>
            <content>Slide 6 Content</content>
            <text>Slide 6 Caption</text>
        </slide>
    </slides>
    Using these preset slides and their placeholder components, please use the original materials and convert them into slides that can be can be used to teach a {targetGrade} class. {prompt}.
    """
)

@csrf_exempt
def ai(request):
    if (request.method == 'POST'):
        load_dotenv()
        uploaded_file = request.FILES.get('file')
        prompt = request.POST.get('prompt')
        context = request.POST.get('context')
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
        # embeddings = GPT4AllEmbeddings()
		
        knowledge_base = FAISS.from_texts(chunks, embeddings)
		
        if prompt:
            docs = knowledge_base.similarity_search(default_template.format(context=context, targetGrade=targetGrade, prompt=prompt))
            llm = OpenAI(temperature=0.8)
            chain = load_qa_chain(llm, chain_type="stuff")
            response = chain.run(input_documents=docs, question=default_template.format(context=context, targetGrade=targetGrade, prompt=prompt))
            return JsonResponse({'response': response})
    return HttpResponse("Hello World")