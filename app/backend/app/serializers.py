from rest_framework import serializers
from app.models import AppUser
# from django.contrib.auth import get_user_model, authenticate
from app.models import AppSave
from app.models import AppComment
from django.contrib.sessions.models import Session
# AppUser = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ('email', 'username', 'password')
        # fields = '__all__'
    def create(self, validated_data):
        password = validated_data.pop('password')
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

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

class AppSaveForm(serializers.ModelSerializer):
    class Meta:
        model= AppSave
        fields = ['id', 'usersessionid', 'tag', 'title', 'filepath', 'timestamp']

class AppCommentSerializer(serializers.ModelSerializer):
    Userid = serializers.IntegerField(write_only=True, source='user.id')
    Postid = serializers.IntegerField(write_only=True, source='post.id')

    class Meta:
        model = AppComment
        fields = ('Userid', 'Postid', 'Comment')

    def create(self, validated_data):
        user_id = validated_data.pop('user')['id']
        post_id = validated_data.pop('post')['id']
        user = AppUser.objects.get(id=user_id)
        post = AppSave.objects.get(id=post_id)
        comment = AppComment.objects.create(user=user, post=post, **validated_data)
        return comment