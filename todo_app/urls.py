from django.urls import path
from . import views

urlpatterns = [
    path('all/', views.getTodo),
    path('create/', views.createTodo),
    path('update/<int:id>/', views.updateStatus),
    path('delete/<int:id>/', views.deleteTodo),
    path('progress/', views.checkProgres),
    path('', views.getHTMLTodo)
]