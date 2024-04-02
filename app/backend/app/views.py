from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from app.models import AppUser
from app.models import AppSaveText
from .serializers import UserSerializer
from .serializers import AppSaveTextSerizalizer
from .serializers import AppSave
from .serializers import AppSaveForm
from django.urls import reverse
from rest_framework.response import Response
import os
import sys
#For Password reset
from django.contrib.auth.tokens import default_token_generator
from django.urls import reverse
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import send_mail
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.encoding import force_str
#
# Create your views here.
@api_view(['GET'])
# @authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
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

class SendPasswordResetEmailView(APIView):
    def post(self, request):
        email = request.data.get('email')
        user = AppUser.objects.filter(email=email).first()
        if user:
            uidb64 = urlsafe_base64_encode(force_bytes(user.pk))

            reset_url = f'http://localhost:3000/ResetPassword/{uidb64}'
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
        #userid = request.data.get('uidb64')
        userid = request.data.get('userid')
        password = request.data.get('password')
        try:
            uid = force_str(urlsafe_base64_decode(userid))
            user = AppUser.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, AppUser.DoesNotExist):
            return Response({'error': 'Invalid user or user does not exist.'}, status=status.HTTP_404_NOT_FOUND)
        user.set_password(password)
        user.save()
        return Response({'success': 'Password has been reset successfully.'}, status=status.HTTP_200_OK)
   