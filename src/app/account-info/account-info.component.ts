import { Component, OnInit, Input } from '@angular/core';
import { User } from '../blog.model';
import { API_URL, UserService } from '../blog.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  @Input() user: User;
  private apiUrl: string = API_URL;

  constructor() { }

  ngOnInit() {
  }

}
