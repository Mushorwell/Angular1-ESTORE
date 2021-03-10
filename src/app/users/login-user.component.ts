import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { NgForm } from '@angular/forms';
import { SignatureKind } from 'typescript';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  users: User[];
  checkUser: User[];
  user = new User();
  pageTitle = 'User Login';
  loggedIn: string;
  regexString = '^[a-zA-Z0-9,-.@~!#$%&*<>?:;_=\'/()]+(\\s+[a-zA-Z0-9,-.@~!#$%&*<>?:;_=\'/()]+)*$';
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    (localStorage.getItem('loggedIn') === 'true') ? this.router.navigateByUrl('/') : '';
  }

  save(signInForm: NgForm): void{

    // bind form input to user object
    this.user.email = signInForm.value.email.trim();
    this.user.password = signInForm.value.password.trim();

    // Getting array of users from api to verify user logging in
    this.userService.getUsers().subscribe({
      next: users => {
        this.users = users;
        // console.log(this.users);

        // filtering uses for login details
        this.checkUser = this.users.filter(user =>
          ((user.email === this.user.email)&&(user.password === this.user.password)));
        // console.log(this.checkUser);
        // verify if email and password are
        if (!this.checkUser) {
          alert('Sorry, could not sign you in. Don\'t have an account? Register now.');

        // Verify if user can login
      } else if (typeof this.checkUser[0] !== 'undefined'){

        // If login details match, user can login and is redirected.
        localStorage.setItem('email', JSON.stringify(this.checkUser[0].email));
        localStorage.setItem('firstname', JSON.stringify(this.checkUser[0].firstName));
        localStorage.setItem('surname', JSON.stringify(this.checkUser[0].lastName));
        localStorage.setItem('id', JSON.stringify(this.checkUser[0].id));
        // this.loggedIn = 'true';
        localStorage.setItem('loggedIn', 'true');
        alert(`Welcome back ${this.checkUser[0].firstName}`);
        location.reload();
        // this.router.navigateByUrl('/profile');
      }
      else{
        // If user can't login, user informed and kept on login page.
        alert('Sorry, could not sign you in. Don\'t have an account? Register now.');
        signInForm.resetForm();
      }
    }
  });
  }
}
