from django.urls import path
from . import views

urlpatterns = [
    path("", views.getData),
    path("add/", views.addUser),
    path("home/", views.HomeView.as_view(), name ='home'),
    path('logout/', views.LogoutView.as_view(), name ='logout'),
    path('save_output/', views.saveOutput, name='save_output'),
]