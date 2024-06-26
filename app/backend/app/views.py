from django.shortcuts import render
from django.core.paginator import Paginator
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
from .serializers import AppSaveSerializer
from .serializers import AppCommentSerializer
from .models import AppComment
from django.core.files.base import ContentFile
from .models import AppUser  # Import your user model
from django.contrib.auth.decorators import login_required
import base64
import os
import sys
from django.contrib.auth.tokens import default_token_generator
from django.urls import reverse
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import send_mail
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status
from django.utils.encoding import force_str



# Create your views here.
@api_view(['GET'])
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
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def currentUser(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(['POST'])
def addUser(request):
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
        serializer = AppSaveSerializer(data=request.data)
        if serializer.is_valid():
            saved_instance = serializer.save()
            return JsonResponse({"message": "Output saved successfully", "postid": saved_instance.id}, status=200)
        else:
            return JsonResponse(serializer.errors, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
@api_view(['GET'])
def getPost(request, id):
    try:
        post = AppSave.objects.get(pk=id)
        serializer = AppSaveSerializer(post)
        return Response(serializer.data)
    except AppSave.DoesNotExist:
        return Response({'error': 'Post not found'}, status=404)

@api_view(['GET'])
def listSavedContent(request):
    saved_content = AppSave.objects.all().order_by('-timestamp')
    paginator = Paginator(saved_content, 10)
    
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    serializer = AppSaveSerializer(page_obj, many=True)
    return JsonResponse({'posts': serializer.data, 'hasNext': page_obj.has_next()})

@api_view(['DELETE'])
def delete_account(request):
    user = request.user
    try:
        user.delete()
        return Response({'message': 'Account deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except AppUser.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def uploadUserImage(request):
    user = request.user  # Get the current user
    data = request.data.get('userSymbol')  # Assuming the image is sent as base64
    
    if data:
        # Delete the old image if it exists
        if user.userSymbol and hasattr(user.userSymbol, 'url'):
            user.userSymbol.delete(save=False)  # Delete the file associated with the previous image, don't save model yet
        
        format, imgstr = data.split(';base64,')  # Split the data to get base64 string
        ext = format.split('/')[-1]  # Extract the file extension
        image_data = base64.b64decode(imgstr)  # Decode the base64 string

        filename = f'user_{user.pk}.{ext}'  # Create a filename for the image
        user.userSymbol.save(name=filename, content=ContentFile(image_data, name=filename))  # Save the new image to the userSymbol field

        return JsonResponse({'message': 'Image uploaded successfully'}, status=200)
    else:
        return JsonResponse({'error': 'No image provided'}, status=400)

class SendPasswordResetEmailView(APIView):
    def post(self, request):
        email = request.data.get('email')
        user = AppUser.objects.filter(email=email).first()
        if user:
            uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            reset_url = f'http://localhost:3000/ResetPassword/{uidb64}/{token}'
            send_mail( 
                'Password Reset Request',
                f'Please follow the link to reset your password: {reset_url}',
                'from@example.com',
                [email],
                fail_silently=False,
            )
            return Response({'success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)
        return Response({'error': 'User with this email does not exist'}, status=status.HTTP_400_BAD_REQUEST)

class ResetPasswordView(APIView):
    def post(self, request): 
        
        userid = request.data.get('userid')
        password = request.data.get('password')
        tokenid= request.data.get('tokenid')
        try:
            uid = force_str(urlsafe_base64_decode(userid))
            user = AppUser.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, AppUser.DoesNotExist):
            return Response({'error': 'Invalid user or user does not exist.'}, status=status.HTTP_404_NOT_FOUND)
        if not default_token_generator.check_token(user, tokenid):
            return Response({'error': 'Invalid token or token has expired.'}, status=status.HTTP_400_BAD_REQUEST)
        user.set_password(password)
        user.save()
        return Response({'success': 'Password has been reset successfully.'}, status=status.HTTP_200_OK)
