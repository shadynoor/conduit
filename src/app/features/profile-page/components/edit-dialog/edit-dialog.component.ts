import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormBuilderModule, FormConfig } from 'form-builder-dynamically';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProfileService } from '../../services/profile.service';
import { checkuserLoggedActions } from '../../../../auth/store/actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [CommonModule, DynamicFormBuilderModule],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss',
})
export class EditDialogComponent implements OnInit {
  username: FormConfig = {
    name: 'username',
    type: 'text',
    label: 'Username',
    placeholder: 'Username',
    id: 'username',
  };

  imgUrl: FormConfig = {
    name: 'imgUrl',
    type: 'text',
    label: 'Image Url',
    placeholder: 'Image Url',
    id: 'imgUrl',
  };

  bio: FormConfig = {
    name: 'bio',
    type: 'textarea',
    label: 'Bio',
    placeholder: 'Bio',
    id: 'bio',
  };

  email: FormConfig = {
    name: 'email',
    type: 'text',
    id: 'email',
    label: 'Email',
    placeholder: 'Enter Your Email',
    pattern: new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
  };

  password: FormConfig = {
    name: 'password',
    type: 'password',
    id: 'password',
    label: 'Password',
    placeholder: 'Enter Your Password',
    maxLength: '15',
    isPassword: true, // required to enable show and hide functionalities
    eyeShow: 'https://static.thenounproject.com/png/777508-200.png', // img for password to automatically show password
    eyeHide:
      'https://icon-library.com/images/show-password-icon/show-password-icon-18.jpg', // img for password to automatically hide password
  };
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  profileService = inject(ProfileService);
  store = inject(Store);
  dialog = inject(MatDialogRef<DynamicFormBuilderModule>);

  ngOnInit(): void {
    this.username.value = this.data.username;
    this.imgUrl.value = this.data.image;
    this.bio.value = this.data.bio;
  }

  myInputsArr = [
    this.username,
    this.imgUrl,
    this.bio,
    // this.email,
    // this.password,
  ];

  getFormValue(form: FormGroup) {
    const myData = {
      image: form.value.imgUrl,
      username: form.value.username,
      bio: form.value.bio,
    };
    delete this.data.email;
    delete this.data.password;
    this.profileService.updateProfile(myData).subscribe((res: any) => {
      localStorage.setItem('user', JSON.stringify(res.user));
      this.dialog.close();
      this.data.username = myData.username;
      this.data.image = myData.image;
      this.data.bio = myData.bio;
    });
  }
}
