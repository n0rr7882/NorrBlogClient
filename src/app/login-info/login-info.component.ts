import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AuthService } from '../blog.service';

import { User } from '../blog.model';

@Component({
  selector: 'app-login-info',
  templateUrl: './login-info.component.html',
  styleUrls: ['./login-info.component.css']
})

export class LoginInfoComponent implements OnInit {

  loginUser: User = new User();

  @Output() onLogout: EventEmitter<undefined> = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService
      .getMe()
      .then(user => {
        this.loginUser = new User(user);
      })
      .catch(err => {
        this.loginUser = new User();
      });
  }

}
