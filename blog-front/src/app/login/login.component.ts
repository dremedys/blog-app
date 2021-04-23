import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MainService} from '../shared/services/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  tried = false;
  constructor(private router: Router, private mainService: MainService) { }
  login(): void{
    this.mainService.login(this.username, this.password).subscribe((data) => {
      localStorage.setItem('token', data.token);
      this.mainService.currentUserName = this.username;
      console.log(data.token);
      // const expires = new Date(jwtToken.exp );
      // console.log('did ' + expires);
      // @ts-ignore
      // const payload = jwtDecode(data.token) as JWTPayload;
      // const expiresAt = moment.unix(payload.exp);
      // console.log('did ' + expiresAt);
      this.router.navigate(['/main']).then();
      this.mainService.logged = true;
    },
      error => {this.tried = true; });
  }
}
