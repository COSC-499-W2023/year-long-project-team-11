from django.urls import path
from . import views

urlpatterns = [
    path('generate_presentation/', views.generate_presentation, name='generate_presentation'),
    path('files/<str:file_name>/', views.serve_file, name='serve_file'),
    path('regenerate_presentation/', views.regenerate_presentation, name='regenerate'),
]