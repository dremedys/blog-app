import { Component, OnInit } from '@angular/core';
import {Post} from '../shared/interfaces';
import {MainService} from '../shared/services/main.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.getMyPosts();
  }

  getMyPosts(): void {
    this.mainService.getMyPosts().subscribe((data) => {
      this.posts = data;
    });
  }
}
