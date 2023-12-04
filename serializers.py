from imaplib import _Authenticator
from django.forms import ValidationError
from rest_framework import serializers
from app.models import AppTag, AppUser, AppSavedContent
from rest_framework.serializers import ModelSerializer

# from django.contrib.auth import get_user_model, authenticate

# AppUser = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ('email', 'username', 'password')
        # fields = '__all__'

# class UserRegisterSerializer(serializers.ModelSerializer):
#     class Meta: 
#         model = AppUser
#         fields = '__all__'
#     def create(self, clean_data):
#         user_obj = AppUser.objects.create_user(email = clean_data['email'], password = clean_data['password'])
#         user_obj.username = clean_data['username']
#         user_obj.save()
#         return user_obj

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def check_user(self, clean_data):
        user = _Authenticator(username = clean_data['email'], password = clean_data['password'])
        if not user:
            raise ValidationError('User not found')
        return user

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model= AppTag
        fields= ('tagname',)

class SavedContentSerializer(serializers.ModelSerializer):
    class Meta:
        model= AppSavedContent
        fields= ('titlename',)
