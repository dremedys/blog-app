import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { PostsComponent} from './posts/posts.component';
import { MainComponent} from './main/main.component';
import {PostFormComponent} from './post-form/post-form.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {MyPostsComponent} from './my-posts/my-posts.component';
import {PostEditComponent} from './post-edit/post-edit.component';

export const AppRoutingModule = RouterModule.forRoot([
  { path: '', pathMatch: 'full', redirectTo: 'auth'},  // when you start server, you will be redirected to '/auth'

  { path: 'auth', component: AuthComponent,
  children: [
    {path: '', pathMatch: 'full' , redirectTo: 'login'}, //  localhost:4200/auth/ -->  localhost:4200/auth/login
    {path: 'login', component: LoginComponent},  // localhost:4200/auth/login will open Login component
    {path: 'register', component: RegisterComponent}
  ]},

  {
    path: 'main',
    component: MainComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'posts' },  // localhost:4200/main/ -->  localhost:4200/main/posts
      {path: 'posts', component: PostsComponent},
      {path: 'post-form', component: PostFormComponent},
      {path: 'my-posts', component: MyPostsComponent},
      {path: 'edit-form/:id', component: PostEditComponent}
    ]
  },
]);
