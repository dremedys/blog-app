from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from .models import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from core.serializers import *

# FBV


@api_view(['GET', 'POST'])
def categories(request):
    permission_classes = [IsAuthenticated]
    if request.method == 'GET':
        categories_list = Category.objects.all()
        serializer = CategorySerializer(categories_list, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


@api_view(['GET', 'POST', 'PUT'])
def posts(request):
    permission_classes = [IsAuthenticated]
    if request.method == 'GET':
        post_list = Post.objects.all()
        serializer = PostSerializer(post_list, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            print('success')
            serializer.save(author_id=request.user.id)
            return Response(serializer.data)
        else:
            print(serializer.errors)
        return Response(serializer.errors)


@api_view(['GET', 'PUT', 'DELETE'])
def post_detail(request, pk):
    permission_classes = [IsAuthenticated]
    try:
        post = Post.objects.get(id=pk)
    except Category.DoesNotExist as e:
        return Response({'message': str(e)}, status=400)
    if request.method == 'PUT':
        serializer = PostSerializer2(instance=post, data=request.data)
        if serializer.is_valid():

            if str(post.author_id) != str(request.user.id):
                print('someone else attempts to change')
                return JsonResponse({'error': 'not yours'})
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
    elif request.method == 'GET':
        serializer = PostSerializer(post)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        if str(post.author_id) != str(request.user.id):
            print('someone else attempts to change your post')
            return JsonResponse({'error': 'error'})
        post.delete()


# this is for testing only
@api_view(['GET', 'POST'])
def comment_list(request):
    if request.method == 'GET':
        comments = Comment.objects.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


@api_view(['GET', 'POST'])
def post_comments(request, pk):
    try:
        comments = Comment.objects.filter(post=pk)
    except Comment.DoesNotExist as e:
        return Response({
            'error': str(e)
        })

    if request.method == 'GET':
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CommentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(author_id=request.user.id)
            serializer.save(post_id=pk)
            return Response(serializer.data)
        else:
            print(serializer.errors)
        return Response(serializer.errors)


@api_view(['GET', 'POST'])
def likes(request, pk):
    try:
        likes = Like.objects.filter(post=pk)
    except Like.DoesNotExist as e:
        return Response({
            'error': str(e)
        })

    if request.method == 'GET':
        serializer = LikeSerializer(likes, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        likes = Like.objects.filter(post=pk, author=request.user)
        if len(likes) == 0:
            serializer = LikeSerializer(data=request.data)
            print(request.data)
            if serializer.is_valid():
                serializer.save(author_id=request.user.id)
                serializer.save(post_id=pk)
                return Response(serializer.data)
            else:
                print(serializer.errors)
            return Response(serializer.errors)
        else:
            myLike = Like.objects.filter(post=pk, author=request.user)
            myLike.delete()
            print('already liked!')
            return Response({'error': 'already liked'})


# CBV

class SignUpView(APIView):
    def get(self, request):
        post_list = User.objects.all()
        serializer = UserSerializer(post_list, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            print('success')
            serializer.save()
            return Response(serializer.data)
        else:
            print('invalid..')
            print(serializer.errors)
        print(serializer.errors)
        return Response(serializer.errors)


class MyPostsView(APIView):
    def get(self, request):
        current_user = request.user
        post_list = Post.objects.filter(author=current_user)
        serializer = PostSerializer(post_list, many=True)
        return Response(serializer.data)





