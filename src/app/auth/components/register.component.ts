import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';
import { RegisterRequest } from '../inetrfaces/auth.interface';
import { registerActions } from '../store/actions';
import { selectIsSubmit, selectValidationErrors } from '../store/reducers';
import { DynamicFormBuilderModule, FormConfig } from 'form-builder-dynamically';

@Component({
  selector: 'app-register',
  standalone: true,
  template: `
    <ng-container *ngIf="allSelectors$ | async as allSelectors">
      <div class="m-auto w-1/2 mt-20">
        <div class="mb-5 text-[1.5rem]">
          Have an account?
          <a class="text-[#a855f7]" routerLink="/login">Login</a>
        </div>
        <!-- <app-dynamic-form
          [formConfig]="myInputs"
          (getFormValue)="getFormValue($event)"
          [buttonClass]="'btn'"
          [isDisabled]="allSelectors.isSubmit"
          [error]="allSelectors.backendErrors"
          [buttonText]="'Signup'"
        ></app-dynamic-form> -->

        <dynamic-form-builder
          [formConfig]="myInputs"
          (getFormData)="getFormValue($event)"
          [inputTagClasses]="
            'bg-gray-200 mb-3 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
          "
          [buttonClasses]="
            'mt-3 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
          "
          [buttonText]="'Signup'"
          [errorMsg]="allSelectors.backendErrors"
          [inputTagLabelClasses]="'text-[#a855f7]'"
          [requiredStarClasses]="'text-[red]'"
        >
        </dynamic-form-builder>
      </div>
    </ng-container>
  `,
  imports: [CommonModule, RouterLink, DynamicFormBuilderModule],
})
export class RegisterComponent implements OnInit {
  username: FormConfig = {
    name: 'username',
    type: 'text',
    label: 'Username',
    isRequired: true,
    placeholder: 'Username',
    id: 'test',
  };

  email: FormConfig = {
    name: 'email',
    type: 'text',
    id: 'email',
    label: 'Email',
    isRequired: true,
    placeholder: 'Enter Your Email',
    pattern: new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
  };

  password: FormConfig = {
    name: 'password',
    type: 'password',
    id: 'password',
    label: 'Password',
    isRequired: true,
    placeholder: 'Enter Your Password',
    maxLength: '15',
    isPassword: true, // required to enable show and hide functionalities
    eyeShow: 'https://static.thenounproject.com/png/777508-200.png', // img for password to automatically show password
    eyeHide:
      'https://icon-library.com/images/show-password-icon/show-password-icon-18.jpg', // img for password to automatically hide password
  };

  myInputs: FormConfig[] = [this.username, this.email, this.password];

  allSelectors$ = combineLatest({
    isSubmit: this.store.select(selectIsSubmit),
    backendErrors: this.store.select(selectValidationErrors),
  });

  constructor(private store: Store) {}

  ngOnInit(): void {}

  getFormValue(form: FormGroup) {
    const data: RegisterRequest = {
      user: form.value,
    };

    this.store.dispatch(registerActions.register({ request: data }));
  }
}
