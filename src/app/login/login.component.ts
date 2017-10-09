import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '../blog.model';

import { AuthService } from '../blog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private idForm: FormControl = new FormControl('');
  private pwForm: FormControl = new FormControl('');

  constructor(private authService: AuthService) { }

  public login(): void {
    this.authService.login(this.idForm.value, this.pwForm.value);
  }
}
