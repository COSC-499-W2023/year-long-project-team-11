from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import openai

# Create your views here.

api_key = "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"
openai.api_key = api_key

def prompt_openai(prompt):
    response = openai.chat.completions.create(
        model = "gpt-3.5-turbo",
        messages = [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ],
        max_tokens = 50,
        temperature = 0.7
    )
    return response.choices[0].message.content.strip()

@csrf_exempt
def ai(request):
    if (request.method == 'POST'):
        data = json.loads(request.body)
        prompt = data.get('prompt')
        response = prompt_openai(prompt)
        return JsonResponse({'prompt': prompt, 'response': response})
    return HttpResponse("Hello World")