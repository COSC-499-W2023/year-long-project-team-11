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

default_template = PromptTemplate.from_template(
    "This is text taken from university course lecture slides. From this original material, generate text for new slides that can be used to teach a {targetGrade} class. Output in a markdown format, denote a new slide with a tag of your choosing. {prompt}"
)

@csrf_exempt
def ai(request):
    if (request.method == 'POST'):
        load_dotenv()
        uploaded_file = request.FILES['file']
        prompt = request.POST['prompt']
        targetGrade = request.POST.get('targetGrade', '')
        
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
            docs = knowledge_base.similarity_search(default_template.format(targetGrade=targetGrade, prompt=prompt))
            
            llm = OpenAI(temperature=0.8)
            chain = load_qa_chain(llm, chain_type="stuff")
            response = chain.run(input_documents=docs, question=default_template.format(targetGrade=targetGrade, prompt=prompt))
        
            return JsonResponse({'response': response})
    return HttpResponse("Hello World")