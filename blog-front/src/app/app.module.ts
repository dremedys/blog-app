import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';
import { PostsComponent } from './posts/posts.component';

import { PostFormComponent } from './post-form/post-form.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { PostComponent } from './post/post.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import {AuthInterceptor} from './AuthInterceptor';
import { PostEditComponent } from './post-edit/post-edit.component';
import {PostFilterPipe} from "./shared/post-filter.pipe";


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainComponent,
    PostsComponent,
    PostFormComponent,
    RegisterComponent,
    LoginComponent,
    PostComponent,
    MyPostsComponent,
    PostEditComponent,
    PostFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
