from django.shortcuts import render
from rest_framework.response import Response
from django.forms.models import model_to_dict
from rest_framework.decorators import api_view
from .models import Todo
from .serializer import TodoSerializer

# Create your views here.
@api_view(['GET'])
def getTodo(request):
    '''Get all todos'''
    todos = Todo.objects.all()
    serializer = TodoSerializer(todos, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getHTMLTodo(request):
    '''Get all todos'''
    return render(request, "home.html", context={})

@api_view(['POST'])
def createTodo(request):
    '''Create a new todo'''
    todo = request.data
    serializer = TodoSerializer(data=todo)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['PUT'])
def updateStatus(request, id):
    '''Toggle todo status'''
    todo = Todo.objects.filter(pk=id).first()
    if not todo:
        response = Response(data={
                                "message":"ID To-Do tidak ditemukan"
                                })
        return response
    
    elif todo.status == "INCOMPLETE":
        todo.status = "COMPLETE"
    else:
        todo.status = "INCOMPLETE"
    todo.save()
    return Response(data=model_to_dict(todo))

@api_view(["DELETE"])
def deleteTodo(request, id):
    '''Delete todo'''
    todo = Todo.objects.filter(pk=id).first()
    if not todo:
        response = Response(data={
                                "message":"ID To-Do tidak ditemukan"
                                })
        return response

    todo.delete()
    response = Response(data=model_to_dict(todo))
    response.data["id"] = id
    return response

@api_view(["GET"])
def checkProgres(request):
    '''Checking the numbers of complete/incomplete tasks'''
    incompleted = Todo.objects.filter(status="INCOMPLETE")
    completed = Todo.objects.filter(status="COMPLETE")
    return Response(data={
        "incomplete": len(incompleted),
        "complete": len(completed)
    })