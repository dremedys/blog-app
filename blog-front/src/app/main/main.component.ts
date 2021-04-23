import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Router } from '@angular/router';
import {MainService} from '../shared/services/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(private router: Router, private  mainService: MainService) {
  }
  ngOnInit(): void {
  }
  getRouter(): Router
  {
    return this.router;
  }
  logout(): void{
    localStorage.removeItem('token');
    this.mainService.logged = false;
  }
  currentUser(): string{
    return this.mainService.currentUserName;
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   const token = localStorage.getItem('token');
  //   // @ts-ignore
  //   const jwtToken = JSON.parse(atob(token.split('.')[1]));
  //   this.mainService.currentUserName =  jwtToken.username;
  // }
}
