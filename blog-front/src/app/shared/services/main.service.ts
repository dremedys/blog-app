import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthToken, Category, Comment, Post, Like} from '../interfaces';
import {shareReplay, tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MainService{
  // tslint:disable-next-line:variable-name
  BASE_URl = 'http://localhost:8000';
  logged = false;
  currentUserName = '';
  // token = localStorage.getItem('token');
  // // @ts-ignore
  // jwtToken = JSON.parse(atob(this.token.split('.')[1]));
  // currentUserName = this.jwtToken.username;
  // currentUserId = this.jwtToken.id;
  constructor(public http: HttpClient) { }
  login(username: string, password: string): Observable<AuthToken> {
    this.currentUserName = username;
    return this.http.post<AuthToken>(`${this.BASE_URl}/login/`, {
        username,
        password
      }
    );
  }
  // GET
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.BASE_URl}/categories`);
  }
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.BASE_URl}/posts`);
  }
  getComments(postId: number): Observable<Comment[]>{
    return this.http.get<Comment[]>(`${this.BASE_URl}/posts/${postId}/comments/`);
  }
  getLikes(postId: number): Observable<Like[]>{
    return this.http.get<Like[]>(`${this.BASE_URl}/posts/${postId}/likes/`);
  }
  getMyPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.BASE_URl}/my_posts`);
  }
  getPost(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.BASE_URl}/posts/${postId}`);
  }
  // POST, DELETE , PUT
  createPost(title: string, text: string, catId: number): Promise<any>{
    return this.http.post(`${this.BASE_URl}/posts`,
      {title, text, category_id: catId, author_id : 1}).toPromise().then(res => res);
  }
  leaveComment(postId: number, txt: string): Promise<any>{
    return this.http.post(`${this.BASE_URl}/posts/${postId}/comments/`,
      { author_id : 1, content: txt, post_id: postId}).toPromise().then();

  }
  like(postId: number): Promise<any>{
    return this.http.post(`${this.BASE_URl}/posts/${postId}/likes/`,
      { author_id : 1, post_id: postId}).toPromise().then();

  }
 putPost(newTitle: string, newText: string, postId: number): Promise<any> {
    return this.http.put(`${this.BASE_URl}/posts/${postId}`, {title: newTitle, text: newText}).toPromise().then();
 }
  deletePost(postId: number): Promise<any> {
    return this.http.delete(`${this.BASE_URl}/posts/${postId}`, ).toPromise().then();
  }


  signup(username: string, password: string): Observable<any> {
    return this.http.post(
      this.BASE_URl.concat('/sign-up/'),
      { username,  password }
    ).pipe(
      tap(() => {console.log('yes'); }),
      shareReplay(),
    );
  }
  // обновление JWT токена
  // public refreshToken() {
  //   this.http.post('/api-token-refresh/', JSON.stringify({token: this.token}), this.httpOptions).subscribe(
  //     data => {
  //       this.updateData(data['token']);
  //     },
  //     err => {
  //       this.errors = err['error'];
  //     }
  //   );
  // }
  // refresh(): void{
  //   this.http.post('/api-token-refresh/', JSON.stringify({token: this.token}), this.httpOptions)
  // }
}

