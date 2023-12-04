from rest_framework import serializers
from app.models import AppUser
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
        user = authenticate(username = clean_data['email'], password = clean_data['password'])
        if not user:
            raise ValidaitonError('User not found')
        return user