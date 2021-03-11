import { AdvertService } from './advert.service';
import { Component, OnInit } from '@angular/core';
import { Advert } from './advert';
import { Router } from '@angular/router';

@Component({
  templateUrl: './adverts.component.html',
  styleUrls: ['./adverts.component.css']
})
export class AdvertsComponent implements OnInit {
  pageTitle: string = 'Product List';
  errorMessage: string = '';
  loggedIn: string = localStorage.getItem('loggedIn');

  filteredAdverts: Advert[] = [];
  adverts: Advert[] = [];

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredAdverts = this.listFilter ? this.performFilter(this.listFilter) : this.adverts;
  }

  constructor(private advertService: AdvertService,
              private router: Router) { }

  performFilter(filterBy: string): Advert[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.adverts.filter((advert: Advert) =>
      advert.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit(): void {
    this.advertService.getAdverts().subscribe({
      next: adverts => {
        this.adverts = adverts;
        this.filteredAdverts = this.adverts;
      },
      error: err => this.errorMessage = err
    });
  }

}
