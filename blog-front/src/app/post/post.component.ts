import {Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Post, Comment, Like} from '../shared/interfaces';
import {MainService} from '../shared/services/main.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  // @ts-ignore
  @Input() post: Post;
  @Input() allowEdit = false;
  comments: Comment[] = [];
  likes: Like[] = [];
  commentText = '';
  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.getComments();
    this.getLikes();
  }
  getComments(): void{
    this.mainService.getComments(this.post.id).subscribe(data => {
      this.comments = data;
    });
  }
  getLikes(): void{
    this.mainService.getLikes(this.post.id).subscribe(data => {
      this.likes = data;
    });

  }
  leaveComment(id: number): void{
    this.getComments();
    this.mainService.leaveComment(id, this.commentText).then(() => {
      this.getComments();
    });
    this.commentText = '';
  }
  like(id: number): void{
    this.getLikes();
    this.mainService.like(id).then(() => {this.getLikes(); });
    this.getLikes();
  }
  // isLiked(): boolean{
  //   for (const likee of this.likes){
  //     if (likee.author.username === this.mainService.currentUserName){
  //       return true;
  //     }
  //   }
  //   return false;
    // return this.likes.filter(item => item.author.username === this.mainService.currentUserName).length > 0;
  //}

}
