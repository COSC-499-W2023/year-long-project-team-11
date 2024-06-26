from rest_framework import serializers
from app.models import AppUser
from django.contrib.auth import get_user_model, authenticate
from app.models import AppSave
from app.models import AppComment
from django.contrib.sessions.models import Session
from rest_framework.exceptions import ValidationError
# AppUser = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    userSymbol_url = serializers.SerializerMethodField()
    class Meta:
        model = AppUser
        fields = ('id', 'email', 'username', 'password', 'userSymbol_url')
        # fields = '__all__'
    def create(self, validated_data):
        password = validated_data.pop('password')
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    def get_userSymbol_url(self, obj):
        if obj.userSymbol and hasattr(obj.userSymbol, 'url'):
            return obj.userSymbol.url
        return None

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
            raise ValidationError('User not found')
        return user

class AppSaveSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='userid.username', read_only=True)
    
    class Meta:
        model = AppSave
        fields = ('id', 'userid', 'username', 'tag', 'title', 'filepath', 'timestamp')

class AppCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppComment
        fields = ('id', 'userid', 'postid', 'comment')