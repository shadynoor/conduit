import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { RouterLink } from '@angular/router';
// import { FormConfig } from '../../shared/helpers/form-config.interface';
import { loginRequest } from '../inetrfaces/auth.interface';
import { loginActions } from '../store/actions';
import { selectIsSubmit, selectValidationErrors } from '../store/reducers';
import { DynamicFormBuilderModule, FormConfig } from 'form-builder-dynamically';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <ng-container *ngIf="allSelectors$ | async as allSelectors">
      <div class="m-auto w-1/2 mt-20">
        <div class="mb-5 text-[1.5rem]">
          Don't have account?
          <a class="text-[#a855f7]" routerLink="/register">Signup</a>
        </div>
        <dynamic-form-builder
          [formConfig]="myInputs"
          (getFormData)="getFormValue($event)"
          [inputTagClasses]="
            'bg-gray-200 mb-3 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
          "
          [buttonClasses]="
            'mt-3 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
          "
          [buttonText]="'Login'"
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
export class LoginComponent {
  email: FormConfig = {
    name: 'email',
    type: 'text',
    id: 'test',
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

  myInputs: FormConfig[] = [this.email, this.password];

  allSelectors$ = combineLatest({
    isSubmit: this.store.select(selectIsSubmit),
    backendErrors: this.store.select(selectValidationErrors),
  });

  constructor(private store: Store) {}

  getFormValue(form: FormGroup) {
    const user: loginRequest = {
      user: {
        email: form.value.email,
        password: form.value.password,
      },
    };
    this.store.dispatch(loginActions.login({ request: user }));
  }

  getFormChanges(event: any) {
    console.log(event);
  }
}
