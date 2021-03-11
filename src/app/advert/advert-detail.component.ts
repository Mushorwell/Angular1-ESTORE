import { AdvertService } from './advert.service';
import { Advert } from './advert';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './advert-detail.component.html',
  styleUrls: ['./advert-detail.component.css']
})
export class AdvertDetailComponent implements OnInit {

  pageTitle = 'Details';
  errorMessage = '';
  advertisement: Advert | undefined;
  isLoggedIn: string = localStorage.getItem('loggedIn');

  constructor(private router: Router,
              private route: ActivatedRoute,
              private adService: AdvertService) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getAdvert(id);
    }else{
      this.router.navigate(['/adverts']);
    }
  }

  getAdvert(id: number) {
    this.adService.getAdvert(id).subscribe({
      next: ad => this.advertisement = ad,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/adverts']);
  }

  onBuy(): void {
    alert("Transaction Successful, thank you. You shall be contacted shortly.");
  }

}
