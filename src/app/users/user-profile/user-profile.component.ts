import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  currentUser: User;
  errorMessage: string;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    (localStorage.getItem('id')) ? '' : this.router.navigateByUrl('/');
    this.loadData();
  }

  loadData(): void {
    this.userService.getUser(parseInt(localStorage.getItem('id'), 10)).subscribe({
      next: user => this.currentUser = user,
      error: err => this.errorMessage = err
    });
  }



}
