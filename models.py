from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin

class AppUserManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError('Email required')
        if not password:
            raise ValueError('Password required')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None):
        user = self.create_user(email, username, password)
        user.is_superuser = True
        user.save(using=self._db)
        return user

class AppUser(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    objects = AppUserManager()

    def __str__(self):
        return self.username

class AppTagManager(models.Manager):
    def create_tag(self, tagname):
        if not tagname:
            raise ValueError('Tag name required')
        tag = self.model(tagname=tagname)
        tag.save(using=self._db)
        return tag

class AppTag(models.Model):
    id = models.AutoField(primary_key=True)
    tagname = models.CharField(max_length=50, unique=True)
    
    objects = AppTagManager()

    def __str__(self):
        return self.tagname

class AppSavedContentManager(models.Manager):
    def create_savedtitle(self, title):
        if not title:
            raise ValueError('Title name required')
        title= self.model(title=title)
        title.save(using=self._db)
        return title

class AppSavedContent(models.Model):
    savedcontentid= models.AutoField(primary_key=True)
    titlename= models.CharField(max_length=50)
    time= models.DateTimeField(auto_now_add=True)
    description= models.CharField(max_length=500)
    objects= AppSavedContentManager()

    def __str__(self):
        return self.titlename 
