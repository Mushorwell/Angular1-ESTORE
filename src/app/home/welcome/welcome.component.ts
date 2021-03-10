import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isThisTypeNode } from 'typescript';

@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  user: string;
  pageTitle: string = 'Welcome';

  constructor(private router: Router) { }

  ngOnInit(): void {
    (localStorage.getItem('loggedIn') === 'true') ?
    this.user = `${JSON.parse(localStorage.getItem('firstname'))} ${JSON.parse(localStorage.getItem('surname'))}`
    : this.user = '';

    if(this.user){
      this.pageTitle += ` ${this.user}`;
    }
  }

}
