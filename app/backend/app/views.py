from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from app.models import AppUser
from app.models import AppSaveText
from .serializers import UserSerializer
from .serializers import AppSaveTextSerizalizer
from .serializers import AppSave
from .serializers import AppSaveForm
import os
import sys

# Create your views here.
@api_view(['GET'])
def getData(request):
    print("In the get(GET) method\n", file=sys.stderr)
    users = AppUser.objects.all()
    serializer = UserSerializer(users, many = True)
    # person = {'username': 'John', 'email': 'johnny@gmail.com'}
    return Response(serializer.data)

@api_view(['POST'])
def addUser(request):
    print("In the add(POST) method\n", file=sys.stderr)
    serializer = UserSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
    else:
         print(serializer.errors, file=sys.stderr)
    return Response(serializer.data)

# permission_classes = (IsAuthenticated)
# @api_view(['GET'])
# def HomeView(request):
#     content = {'message': 'Welcome to the JWT Authentication page using React Js and Django!'}
#     return Response(content)
class HomeView(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request):
        content = {'message': 'Welcome to the JWT Authentication page using React Js and Django!'}
        return Response(content)

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):     
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

def saveOutput(request):
    try:
        serializer = AppSaveTextSerizalizer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"message": "Output saved successfully"}, status=200)
        else:
            return JsonResponse(serializer.errors, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

class AppSaveList(APIView):
    queryset= AppSave.objects.all()
    serializer_class= AppSaveForm
    