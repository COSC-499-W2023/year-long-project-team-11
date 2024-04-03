from django.urls import path
from . import views
from .views import delete_account

urlpatterns = [
    path("", views.getData),
    path('<int:user_id>/', views.getData),
    path('currentuser/', views.currentUser, name='current_user'),
    path("add/", views.addUser),
    path('appsaves/', views.AppSaveList.as_view(), name='save_app'),
    path("home/", views.HomeView.as_view(), name ='home'),
    path('logout/', views.LogoutView.as_view(), name ='logout'),
    path('save_output/', views.saveOutput, name='save_output'),
    path('savedcontent/', views.listSavedContent, name='listSavedContent'),
    path("addcomment/", views.addComment, name='add comment' ),
    path("comments/<int:postid>/", views.getComment, name='getComment'),
    path("posts/<int:id>/", views.getPost, name='getPost'),
    path('delete_account/', delete_account, name='delete_account'),
    path('forgetpassword/', views.SendPasswordResetEmailView.as_view(), name='forgetpassword'),
    path('resetpassword/', views.ResetPasswordView.as_view(), name='resetpassword'),
]
