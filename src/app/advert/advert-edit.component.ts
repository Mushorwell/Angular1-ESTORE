import { GenericValidator } from './../shared/generic-validator';
import { AdvertService } from './advert.service';
import { Advert } from './advert';
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  templateUrl: './advert-edit.component.html',
  styleUrls: ['./advert-edit.component.css']
})
export class AdvertEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  isLoggedIn: string = localStorage.getItem('loggedIn');
  pageTitle = 'Advertisement Edit';
  errorMessage: string;
  advertForm: FormGroup;


  advert: Advert;
  private sub: Subscription;

  // Validation properties
  private minNameLength: number;
  private maxNameLength: number;
  private minDescriptionLength: number;
  private maxDescriptionLength: number;
  private minimumPrice: number;
  private regexStringText: string;
  private regexStringNumber: string;

   // Use with the generic validation message class
   displayMessage: { [key: string]: string } = {};
   private validationMessages: { [key: string]: { [key: string]: string } };
   private genericValidator: GenericValidator;

   get tags(): FormArray {
    return this.advertForm.get('tags') as FormArray;
  }

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private advertService: AdvertService) {

      this.minNameLength = 3;
      this.maxNameLength = 20;
      this.minDescriptionLength = 20;
      this.maxDescriptionLength = 200;
      this.minimumPrice = 100;
      this.regexStringText = '^[a-zA-Z0-9,-.@~!#$%&*<>?:;_=\'/()]+(\\s+[a-zA-Z0-9,-.@~!#$%&*<>?:;_=\'/()]+)*$';
      this.regexStringNumber = '^-?(0|[1-9]\d*)?$';     //'/^(\d*\.)?\d+$/';

    // Definitions of all possible validation errors for the form
      this.validationMessages = {
      name: {
        required: 'Name of product being advertised is required.',
        minlength: 'Name of product must be at least three characters.',
        maxlength: 'Name of product cannot exceed 50 characters.',
        pattern: 'Enter valid information with no trailing spaces'
      },
      description: {
        required: 'A description of the product is required.',
        minlength: 'The description must be at least 20 characters.',
        maxlength: 'The description cannot exceed 200 characters.',
        pattern: 'Enter valid information with no trailing spaces'
      },
      price: {
        required: 'The pricing of the product required.',
        min: 'The items on sale on the platform must be at least R100',
        pattern: 'Price must be a valid number or decimal with no spaces'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
      this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // verifying that the user is logged in and if not the page will re-route to home
    if (!this.isLoggedIn){
      this.router.navigate(['/']);
    }

    this.advertForm = this.formBuilder.group({
      name: ['', [Validators.required,
                         Validators.minLength(this.minNameLength),
                         Validators.maxLength(this.maxNameLength),
                         Validators.pattern(this.regexStringText)]],
      description: ['', [Validators.required,
                        Validators.minLength(this.minDescriptionLength),
                        Validators.maxLength(this.maxDescriptionLength),
                        Validators.pattern(this.regexStringText)]],
      price: ['', [Validators.required,
                        Validators.min(this.minimumPrice),
                      // Validators.pattern(this.regexStringNumber)
                    ]],
      tags: this.formBuilder.array([]),
    });

    // Read the product Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getAdvert(id);
      }
    );
  }

  displayAdvert(ad: Advert): void {
    if (this.advertForm) {
      this.advertForm.reset();
    }
    this.advert = ad;

    if (this.advert.id === 0) {
      this.pageTitle = 'Add Advert';
    } else {
      !this.advert ? this.router.navigate(['/adverts']) :
      this.pageTitle = `Edit Advert: ${this.advert.name}`;
    }

    // Update the data on the form
    this.advertForm.patchValue({
      name: this.advert.name,
      price: this.advert.price,
      description: this.advert.description
    });
    this.advertForm.setControl('tags', this.formBuilder.array(this.advert.tags || []));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.advertForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.advertForm);
    });
  }

  addTag(): void {
    this.tags.push(new FormControl());
  }

  deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

  getAdvert(id: number): void {
    this.advertService.getAdvert(id)
      .subscribe({
        next: (advert: Advert) => this.displayAdvert(advert),
        error: err => this.errorMessage = err
      });
  }

  deleteAdvert(): void {
    if (this.advert.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the product: ${this.advert.name}?`)) {
        this.advertService.deleteAdvert(this.advert.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  saveAdvert(): void {
    if (this.advertForm.valid) {
      if (this.advertForm.dirty) {
        const p : Advert = { ...this.advert, ...this.advertForm.value };

        if (p.id === 0) {
          this.advertService.createAdvert(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          this.advertService.updateAdvert(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.advertForm.reset();
    this.router.navigate(['/adverts']);
  }
}
