import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MainService} from '../shared/services/main.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username = '';
  password = '';
  email = '';
  password1 = '';
  constructor(private router: Router, private mainService: MainService) { }

  ngOnInit(): void {
  }
  register(): void{
    if (this.password === this.password1){
      this.mainService.signup(this.username,  this.password).subscribe(
        success => console.log('success'),
        error => console.log('error')
      );
      this.router.navigate(['/auth/login']).then();
    }
    }


}
