import { Component, OnInit } from '@angular/core';
import {MainService} from '../shared/services/main.service';
import {Category} from '../shared/interfaces';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  title = '';
  text = '';
  categories: Category[] = [];
  // @ts-ignore
  catForm: FormGroup;
  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.getCategories();
    this.catForm = new FormGroup({catControl: new FormControl()});
  }
  createPost(): void{
    this.mainService.createPost(this.title, this.text, this.catForm.controls.catControl.value).then(() => {
      this.title = '';
      this.text = '';
    });
  }

  getCategories(): void{
    this.mainService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }
}
