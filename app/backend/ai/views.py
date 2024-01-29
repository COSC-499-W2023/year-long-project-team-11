from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, FileResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from dotenv import load_dotenv
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from datetime import datetime
import xml.etree.ElementTree as ET
from pptx.dml.color import RGBColor
from pptx import Presentation
import os

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

current_file_path = os.path.dirname(os.path.realpath(__file__))
GENERATEDCONTENT_DIRECTORY = os.path.join(current_file_path, 'generatedcontent')

BLACK = RGBColor(0, 0, 0)
WHITE = RGBColor(255, 255, 255)
LIGHTBLUE = RGBColor(135, 206, 235)
CREAM = RGBColor(255, 253, 208)
GREY = RGBColor(128, 128, 128)

def generate_filename(extension='.pptx', directory=GENERATEDCONTENT_DIRECTORY):
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    file_name = f"presentation_{timestamp}{extension}"
    
    # handle duplicate filename case
    counter = 1
    unique_file_name = file_name
    while os.path.exists(os.path.join(directory, unique_file_name)):
        unique_file_name = f"presentation_{timestamp}_{counter}{extension}"
        counter += 1
    return unique_file_name

def set_background_color(prs, color):
    for master in prs.slide_masters:
        background = master.background
        fill = background.fill
        fill.solid()
        fill.fore_color.rgb = color  # Set color to ---- (needs a form value to change here)

def set_font(prs, type):
    for slide in prs.slides:
        for shape in slide.shapes:
            if hasattr(shape, "text_frame") and shape.text_frame:
                for paragraph in shape.text_frame.paragraphs:
                    for run in paragraph.runs:
                        run.font.name = type  # Set font to ---- (needs a form value to change here)

def set_font_color(prs, color):
    for slide in prs.slides:
        for shape in slide.shapes:
            if hasattr(shape, "text_frame") and shape.text_frame:
                for paragraph in shape.text_frame.paragraphs:
                    for run in paragraph.runs:
                        run.font.color.rgb = color  # Set font color ---- (needs a form value to change)


def generate_slides_from_XML(xml_string, bgcolor, fonttype, fontcolor):
    root = ET.fromstring(xml_string)
    prs = Presentation()
    set_background_color(prs, bgcolor)

    for slide in root.findall('slide'):
        if slide.get('layout') == 'title':
            title_slide_layout = prs.slide_layouts[0]
            title_slide = prs.slides.add_slide(title_slide_layout)
            shapes = title_slide.shapes
            for i, element in enumerate(slide):
                if element.tag == "content":
                    content_string = "" 
                    for bullet in element:
                        content_string += (bullet.text + '\n')
                    shapes.placeholders[i].text_frame.text = content_string
                else:
                    shapes.placeholders[i].text_frame.text = element.text
        elif slide.get('layout') == 'content':
            content_slide_layout = prs.slide_layouts[1]
            content_slide = prs.slides.add_slide(content_slide_layout)
            shapes = content_slide.shapes
            for i, element in enumerate(slide):
                if element.tag == "content":
                    content_string = "" 
                    for bullet in element:
                        content_string += (bullet.text + '\n')
                    shapes.placeholders[i].text_frame.text = content_string
                else:
                    shapes.placeholders[i].text_frame.text = element.text
        elif slide.get('layout') == 'header':
            header_slide_layout = prs.slide_layouts[2]
            header_slide = prs.slides.add_slide(header_slide_layout)
            shapes = header_slide.shapes
            for i, element in enumerate(slide):
                if element.tag == "content":
                    content_string = "" 
                    for bullet in element:
                        content_string += (bullet.text + '\n')
                    shapes.placeholders[i].text_frame.text = content_string
                else:
                    shapes.placeholders[i].text_frame.text = element.text
        elif slide.get('layout') == 'two':
            twocontent_slide_layout = prs.slide_layouts[3]
            twocontent_slide = prs.slides.add_slide(twocontent_slide_layout)
            shapes = twocontent_slide.shapes
            for i, element in enumerate(slide):
                if element.tag == "content":
                    content_string = "" 
                    for bullet in element:
                        content_string += (bullet.text + '\n')
                    shapes.placeholders[i].text_frame.text = content_string
                else:
                    shapes.placeholders[i].text_frame.text = element.text
        elif slide.get('layout') == 'comp':
            comparison_slide_layout = prs.slide_layouts[4]
            comparison_slide = prs.slides.add_slide(comparison_slide_layout)
            shapes = comparison_slide.shapes
            for i, element in enumerate(slide):
                if element.tag == "content":
                    content_string = "" 
                    for bullet in element:
                        content_string += (bullet.text + '\n')
                    shapes.placeholders[i].text_frame.text = content_string
                else:
                    shapes.placeholders[i].text_frame.text = element.text
        elif slide.get('layout') == 'caption':
            caption_slide_layout = prs.slide_layouts[7]
            caption_slide = prs.slides.add_slide(caption_slide_layout)
            shapes = caption_slide.shapes
            for i, element in enumerate(slide):
                if element.tag == "content":
                    content_string = "" 
                    for bullet in element:
                        content_string += (bullet.text + '\n')
                    shapes.placeholders[i].text_frame.text = content_string
                else:
                    shapes.placeholders[i].text_frame.text = element.text
    set_font(prs, fonttype)
    set_font_color(prs, fontcolor)
    file_name = generate_filename()
    file_path = os.path.join(GENERATEDCONTENT_DIRECTORY, file_name)
    prs.save(file_path)
    return file_name

@csrf_exempt
def ai(request):
    if (request.method == 'POST'):
        load_dotenv()
        uploaded_file = request.FILES.get('file')
        prompt = request.POST.get('prompt')
        ctx = request.POST.get('ctx')
        targetGrade = request.POST.get('targetGrade')
        bgcolor = request.POST.get('backgroundColor')
        fonttype = request.POST.get('fontType')
        fontcolor = request.POST.get('fontColor')

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
		
        if ctx:
            docs = knowledge_base.similarity_search(default_template.format(ctx=ctx, targetGrade=targetGrade, prompt=prompt))
            llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0.8)
            chain = load_qa_chain(llm, chain_type="stuff")
            response = chain.run(input_documents=docs, question=default_template.format(ctx=ctx, targetGrade=targetGrade, prompt=prompt))
            
            
            if bgcolor == 'BLACK':
                bgcolor = BLACK
            elif bgcolor == 'WHITE':
                bgcolor = WHITE
            elif bgcolor == 'LIGHTBLUE':
                bgcolor = LIGHTBLUE
            elif bgcolor == 'CREAM':
                bgcolor = CREAM
            elif bgcolor == 'GREY':
                bgcolor = GREY

            bgcolor = WHITE

            if fontcolor == 'BLACK':
                fontcolor = BLACK
            elif fontcolor == 'WHITE':
                fontcolor = WHITE

            fontcolor = BLACK

            file_name = generate_slides_from_XML(response, bgcolor, fonttype, fontcolor)
            return JsonResponse({'filename' : file_name, 'response': response})
        else:
            return JsonResponse({'response': 'No context specified'})
    return HttpResponse("Listening for requests...")

def serve_presentation(request, file_name):
    file_path = os.path.join(GENERATEDCONTENT_DIRECTORY, file_name)
    
    if os.path.exists(file_path) and os.path.isfile(file_path):
        return FileResponse(open(file_path, 'rb'), as_attachment=True)
    else:
        raise Http404("The requested file does not exist")