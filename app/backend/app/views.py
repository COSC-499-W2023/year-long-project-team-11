from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework import status
from django.http import JsonResponse
from app.models import AppUser
from .serializers import UserSerializer
from .serializers import AppSave
from .serializers import AppSaveForm
from .serializers import AppCommentSerializer
from .models import AppComment
import os
import sys

# Create your views here.
@api_view(['GET'])
# @authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def getData(request, user_id=None):
    print("In the get(GET) method\n", file=sys.stderr)
    
    if user_id is not None:
        try:
            user = AppUser.objects.get(id=user_id)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        except AppUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)
        
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

@api_view(['POST'])
def addComment(request):
    serializer = AppCommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getComment(request, postid):
    comments = AppComment.objects.filter(postid=postid)
    serializer = AppCommentSerializer(comments, many=True)
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

@api_view(['POST'])
def saveOutput(request):
    try:
        serializer = AppSaveForm(data=request.data)
        if serializer.is_valid():
            saved_instance = serializer.save()
            return JsonResponse({"message": "Output saved successfully", "postid": saved_instance.id}, status=200)
        else:
            return JsonResponse(serializer.errors, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

class AppSaveList(APIView):
    queryset= AppSave.objects.all()
    serializer_class= AppSaveForm

@api_view(['DELETE'])
def delete_account(request):
    user = request.user
    try:
        # Perform any additional checks if necessary (e.g., requiring a password confirmation)
        
        user.delete()
        return Response({'message': 'Account deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)