import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './users/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ESTORE';

  userProfile: string = localStorage.getItem('loggedIn');

  activeUser: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  signOut(): void {
    localStorage.clear();
    this.ngOnInit();
    location.reload();
    this.router.navigateByUrl('/');
    // console.log(localStorage);
  }
}
