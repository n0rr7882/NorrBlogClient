import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { API_URL, AuthService } from '../blog.service';

import { User } from '../blog.model';

@Component({
  selector: 'app-login-info',
  templateUrl: './login-info.component.html',
  styleUrls: ['./login-info.component.css']
})

export class LoginInfoComponent implements OnInit {

  private apiUrl: string = API_URL;
  @Output() onLogout: EventEmitter<undefined> = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

}
