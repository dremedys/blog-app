from django.urls import path, include
from core.views import *
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

urlpatterns = [
    path('login/', obtain_jwt_token),
    path('sign-up/', SignUpView.as_view()),
    path('posts', posts),
    path('my_posts', MyPostsView.as_view()),  # current user posts
    path('categories', categories),
    path('comments/', comment_list),
    path('posts/<int:pk>/comments/', post_comments),
    path('posts/<int:pk>', post_detail),
    path('token-refresh/', refresh_jwt_token),
    path('posts/<int:pk>/likes/', likes)
]