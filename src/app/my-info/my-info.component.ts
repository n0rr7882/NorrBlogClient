import { Component, OnInit } from '@angular/core';
import { User } from '../blog.model';
import { IUser } from '../blog.interface';
import { API_URL, AuthService } from '../blog.service';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css']
})
export class MyInfoComponent implements OnInit {

  private apiUrl: string;

  private user: User = undefined;

  constructor(private authService: AuthService) {
    this.apiUrl = API_URL;
  }

  ngOnInit() {
    this.authService
      .getMe()
      .then(user => this.user = new User(user))
      .catch(err => { });
  }

}
