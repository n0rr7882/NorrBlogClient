import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';

import { User } from '../blog.model';

import { IUser } from '../blog.interface';

import { UserService } from '../blog.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  private isSignupPanelOpen: boolean;

  private idForm: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*)[a-zA-Z0-9]{6,30}$/)
  ]);
  private pwForm: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/)
  ]);
  private nameForm: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*)[^\s]{1,15}$/)
  ]);
  private emailForm: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
  ]);

  private passwordAgain: string;

  constructor(public userService: UserService, public snackBar: MdSnackBar) { }

  public signup() {
    if (this.pwForm.value === this.passwordAgain) {
      if (this.idForm.valid && this.nameForm.valid && this.emailForm.valid && this.pwForm.valid) {
        let user: IUser = {
          id: this.idForm.value,
          pw: this.pwForm.value,
          name: this.nameForm.value,
          email: this.emailForm.value,
          creationDate: new Date(),
          isAdmin: false,
          isDenied: false
        };

        this.userService
          .createUser(user)
          .then(result => {
            if (result) {
              this.idForm.setValue('');
              this.nameForm.setValue('');
              this.emailForm.setValue('');
              this.pwForm.setValue('');
              this.passwordAgain = '';
              this.isSignupPanelOpen = false;
            }
          })
          .catch(err => {
            throw err;
          });

      } else {
        this.snackBar.open('입력 형식을 지켜주세요!', 'close', { duration: 3000 });
      }
    } else {
      this.snackBar.open('암호가 일치하지 않습니다!', 'close', { duration: 3000 });
    }
  }

  public open(): void {
    this.isSignupPanelOpen = true;
  }

  public close(): void {
    this.isSignupPanelOpen = false;
  }

}
