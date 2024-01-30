from django.urls import path
from . import views

urlpatterns = [
    path('', views.ai, name='ai'),
    path('presentations/<str:file_name>/', views.serve_presentation, name='serve_presentation')
]