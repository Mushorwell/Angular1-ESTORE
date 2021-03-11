import { MatchValidator } from './../shared/match.validator';
import { UserService } from './user.service';
import { User } from './user';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray, FormControlName } from '@angular/forms';
import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GenericValidator } from '../shared/generic-validator';

function checkValidInput(c: AbstractControl): {[key: string]: boolean} |null {
  if (c.value.trim() === ''){
    return {validInput: false};
  }
  return null;
}

@Component({
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  // Form model
  registerUserForm: FormGroup;

  // Empty user object for Account creation
  private user: User = new User();

  // Validation properties
  private minFirstNameLength: number;
  private maxFirstNameLength: number;
  private minLastNameLength: number;
  private maxLastNameLength: number;
  private maxEmailLength: number;
  private maxPasswordLength: number;
  private minPhoneLength: number;
  private maxPhoneLength: number;
  private regexStringNumber: string;
  private regexStringText: string;


  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  // Validation feedback properties
  errorMessage?: string;

  constructor(
              private fb: FormBuilder,
              private router: Router,
              private userService: UserService) {

  this.minFirstNameLength = 1;
  this.maxFirstNameLength = 25;
  this.minLastNameLength = 2;
  this.maxLastNameLength = 25;
  this.maxEmailLength = 30;
  this.maxPasswordLength = 25;
  this.minPhoneLength = 10;
  this.maxPhoneLength = 10;
  this.regexStringNumber = '^[0-9]+$';
  this.regexStringText = '/^[a-zA-Z0-9,-.@~!#$%&*<>?:;_=\'/()]+(\\s+[a-zA-Z0-9,-.@~!#$%&*<>?:;_=\'/()]+)*$/';

  this.validationMessages = {
    firstName: {
      required: 'Please enter your first name.',
      minlength: `Your first name must contain at least ${this.minFirstNameLength} characters.`,
      maxlength: `Your first name must contain less than ${this.maxFirstNameLength} characters.`,
      // validInput: 'PLease enter valid input.',
      pattern: 'No spaces should be at the beginning or the end of your name.'
    },
    lastName: {
      required: 'Please enter your last name.',
      minlength: `Your last name must contain at least ${this.minLastNameLength} characters.`,
      maxlength: `Your last name must contain less than ${this.maxLastNameLength} characters.`,
      // validInput: 'PLease enter valid input.',
      pattern: 'No spaces should be at the beginning or the end of your last name.'
    },
    email: {
      required: 'Please enter your email address.',
      email: 'Please enter a valid email address.',
      maxlength: `Your email address must contain less than ${this.maxEmailLength} characters.`,
      pattern: 'No spaces should be at the beginning or the end of your name.'
    },
    password: {
      required: 'Please enter your chosen password.',
      maxlength: `Your password must contain less than ${this.maxPasswordLength} characters.`,
      pattern: 'Please enter a valid password with no trailing spaces.'
    },
    confirmPassword: {
      required: 'Please confirm your password.',
      pattern: 'Please enter valid input'
    },
    phone: {
      required: 'Please enter your phone number',
      minlength: `Please ensure your number is no less than ${this.minPhoneLength} digits`,
      maxlength: `Please ensure your number is no more than ${this.maxPhoneLength} digits`,
      pattern: 'Please enter a valid phone number.'
    },
    passwordGroup: {
      match: 'Please make sure the confirmation matches your password.',
    }
  };
  this.genericValidator = new GenericValidator(this.validationMessages);
}

  // private validationMessages = {
  //   required: 'Please enter your email address.',
  //   email: 'Please enter a valid email address.'
  // };

   ngOnInit(): void {

    (localStorage.getItem('loggedIn')) ? this.router.navigateByUrl('/') : '' ;

    this.registerUserForm = this.fb.group({

      firstName: ['',
      [Validators.required,
        Validators.minLength(this.minFirstNameLength),
        Validators.maxLength(this.maxFirstNameLength),
        // checkValidInput,
        Validators.pattern(this.regexStringText)]],

      lastName: ['',
      [Validators.required,
        Validators.minLength(this.minLastNameLength),
        Validators.maxLength(this.maxLastNameLength),
        // checkValidInput,
        Validators.pattern(this.regexStringText)]],

      email: ['',
      [Validators.required,
        Validators.email,
        Validators.maxLength(this.maxEmailLength),
        Validators.pattern(this.regexStringText)]],

      passwordGroup: this.fb.group({

        password: ['',
        [Validators.required,
          Validators.maxLength(this.maxPasswordLength),
          // checkValidInput,
          Validators.pattern(this.regexStringText)
        ]],

        confirmPassword: ['',
        [Validators.required,
        Validators.pattern(this.regexStringText)]]

      }),

      phone: ['',
      [Validators.required,
        Validators.minLength(this.minPhoneLength),
        Validators.maxLength(this.maxPhoneLength),
        Validators.pattern(this.regexStringNumber)]],
    });
    const passwordFormGroup = this.registerUserForm.get('passwordGroup');
    passwordFormGroup.setValidators(MatchValidator.match(passwordFormGroup.get('password'), passwordFormGroup.get('confirmPassword')));
  }

   ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.registerUserForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.registerUserForm);
    });
  }

  // Method for creating user object in save method
  private initializeUser(): void {
      this.user = {
        id: null,
        firstName: this.registerUserForm.value.firstName,
        lastName: this.registerUserForm.value.lastName,
        email: this.registerUserForm.value.email,
        password: this.registerUserForm.value.passwordGroup.password,
        phoneNumber: this.registerUserForm.value.phone
      };
  }

  // Save method first checks that the form is valid and then creates a user
  save(): void {

    this.initializeUser();

    this.userService.createUser(this.user)
    .subscribe({
      // success case: User is created and signed in,
      next: () => this.onSaveComplete(),
      error: (error: any) => this.errorMessage = error
      });
  }

onSaveComplete(): void {
    // Reset the form to clear the flags then routed to user page
    this.registerUserForm.reset();
    // localStorage.setItem('userProfile', JSON.stringify(this.user));
    this.router.navigate(['/login']);
  };

}
