import { Component, OnInit } from '@angular/core';
import {Post} from '../shared/interfaces';
import {MainService} from '../shared/services/main.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {
  posts: Post[] = [];
  searchString = '';
  constructor(private mainService: MainService) { }
  ngOnInit(): void {
    this.getPosts();
  }
  getPosts(): void {
    this.mainService.getPosts().subscribe((data) => {
      this.posts = data;
    });
  }

}
