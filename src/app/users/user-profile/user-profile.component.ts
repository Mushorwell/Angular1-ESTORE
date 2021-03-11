import { Advert } from '../../advert/advert';
import { AdvertService } from './../../advert/advert.service';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { createImportSpecifier } from 'typescript';

@Component({
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  currentUser: User;
  userAdverts: Advert[];
  filteredAdverts: Advert[] = [];
  errorMessage: string;

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredAdverts = this.listFilter ? this.performFilter(this.listFilter) : this.userAdverts;
  }

  constructor(private router: Router,
              private userService: UserService,
              private advertService: AdvertService
    ) { }

  ngOnInit(): void {
    (localStorage.getItem('id')) ? '' : this.router.navigateByUrl('/');
    this.loadData();

    this.advertService.getAdverts().subscribe({
      next: adverts => {
        this.userAdverts = adverts.filter((ad: Advert) => ad.userId === parseInt(localStorage.getItem('id'), 10));
        console.log(this.userAdverts);
        this.filteredAdverts = this.userAdverts;
      },
      error: err => this.errorMessage = err
    });
  }

  loadData(): void {
    this.userService.getUser(parseInt(localStorage.getItem('id'), 10)).subscribe({
      next: user => this.currentUser = user,
      error: err => this.errorMessage = err
    });
  }

  performFilter(filterBy: string): Advert[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.userAdverts.filter((advert: Advert) =>
      advert.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }



}
