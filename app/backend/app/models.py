from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

# Create your models here.
class AppUserManager(BaseUserManager):
    def create_user(self, email, username, password = None):
        if not email:
            raise ValueError('Email required')
        if not password:
            raise ValueError('Password required')
        email = self.normalize_email(email)
        user = self.model(email = email)
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self, email, username, password = None):
        if not email:
            raise ValueError('Email required')
        if not password:
            raise ValueError('Password required')
        user = self.create_user(email, username, password)
        user.is_superuser = True
        user.save()
        return user

class AppUser(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key = True)
    email = models.EmailField(max_length = 50, unique = True)
    username = models.CharField(max_length = 50)
    password = models.CharField(max_length = 50)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = AppUserManager()
    def __str__(self):
        return self.username

class AppSaveText(models.Model):
    id= models.AutoField(primary_key= True)
    savecontent= models.TextField()
    def __str__(self):
        return self.savecontent
    
class AppComment(models.Model):
    id = models.AutoField(primary_key = True)
    Userid = models.IntegerField()
    Postid = models.IntegerField()
    Comment = models.CharField(max_length = 200)
