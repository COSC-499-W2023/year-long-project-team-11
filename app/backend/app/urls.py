from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
urlpatterns = [
    path("", views.getData),
    path("add/", views.addUser),
    path("home/", views.HomeView.as_view(), name ='home'),
    path('logout/', views.LogoutView.as_view(), name ='logout'),
    path('save_output/', views.saveOutput, name='save_output'),
    path('appsaves/', views.AppSaveList.as_view(), name='save_app'),
    path('forgetpassword/', views.SendPasswordResetEmailView.as_view(), name='forgetpassword'),
    path('resetpassword/', views.ResetPasswordView.as_view(), name='resetpassword'),
]