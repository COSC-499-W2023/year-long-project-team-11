from django.urls import path
from . import views

urlpatterns = [
    path('generate_presentation/', views.generate_presentation, name='generate_presentation'),
    path('regenerate_presentation/', views.regenerate_presentation, name='regenerate'),
    path('generate_quiz/', views.generate_quiz, name='generate_quiz'),
    path('regenerate_quiz/', views.regenerate_quiz, name='regenerate_quiz'),
    path('files/<str:file_name>/', views.serve_file, name='serve_file'),
]