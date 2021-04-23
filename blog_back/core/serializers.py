from django.contrib.auth import get_user_model
from django.http import HttpRequest
from rest_framework import serializers
from core.models import *
from django.contrib.auth.models import User


# Model Serializers

class CategorySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Category
        fields = ('name', 'id')


class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    write_only_fields = 'password'

    # fields = ('id', 'username', 'password')

    class Meta:
        model = User
        fields = ('username', 'id', 'password')  # 'first_name', 'last_name'

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user


class PostSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    author = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    author_id = serializers.IntegerField(write_only=True)
    category_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Post
        fields = '__all__'
        extra_kwargs = {'user': {'required': False}}

    # class Meta:
    #     model = Post
    # fields = ('id', 'title', 'text', 'published_date', 'author', 'category', 'category_id', 'author_id')


class LikeSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    post = PostSerializer(read_only=True)
    id = serializers.IntegerField(read_only=True)
    # author_id = serializers.IntegerField(write_only=True)
    post_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Like
        fields = ['author', 'post', 'id', 'author_id', 'post_id']

    def create(self, validated_data):
        like = Like(**validated_data)
        like.save()
        return like


# Serializer serializers

class CommentSerializer(serializers.Serializer):
    content = serializers.CharField()
    author = UserSerializer(read_only=True)
    post = PostSerializer(read_only=True)
    id = serializers.IntegerField(read_only=True)
    author_id = serializers.IntegerField(write_only=True)
    post_id = serializers.IntegerField(write_only=True)

    def create(self, validated_data):
        comment = Comment(**validated_data)
        comment.save()
        return comment

    def update(self, instance, validated_data):
        pass


class PostSerializer2(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    author = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    title = serializers.CharField()
    text = serializers.CharField()
    published_date = serializers.DateTimeField(read_only=True)

    def update(self, instance, validated_data):
        instance.title = validated_data['title']
        instance.text = validated_data['text']
        instance.save()
        return instance

    def create(self, validated_data):
        pass
