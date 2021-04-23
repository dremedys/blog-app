import { Component, OnInit } from '@angular/core';
import {Post} from '../shared/interfaces';
import {MainService} from '../shared/services/main.service';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent  implements OnInit {
  // @ts-ignore
  post: Post;
  // @ts-ignore
  id = +this.route.snapshot.paramMap.get('id');
  newTitle = '';
  newText = '';
  constructor(private  mainService: MainService, public location: Location, public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getPost();

  }
  goBack(): void {
    this.location.back();
  }
  getPost(): void{
    this.mainService.getPost(this.id).pipe(first())
      .subscribe(data => {
        this.post = data;
        this.newText = this.post.text;
        this.newTitle = this.post.title;
      });
  }
  editPost(): void{
    this.mainService.putPost(this.newTitle, this.newText, this.id)
      .then(() => {this.goBack(); });
  }
  deletePost(): void{
    this.mainService.deletePost(this.id)
      .then(() => {this.goBack(); });
  }

}
