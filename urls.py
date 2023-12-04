from django.urls import path
from . import views

urlpatterns = [
    path("", views.getData),
    path("add/", views.addUser),
    path("home/", views.HomeView.as_view(), name ='home'),
    path('logout/', views.LogoutView.as_view(), name ='logout'),
    path("addtag/", views.addTag),
    path("addtitle/", views.addSavedContent),
]