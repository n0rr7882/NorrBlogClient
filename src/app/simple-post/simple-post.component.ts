import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../blog.model';
import { API_URL } from '../blog.service';

@Component({
  selector: 'app-simple-post',
  templateUrl: './simple-post.component.html',
  styleUrls: ['./simple-post.component.css']
})
export class SimplePostComponent implements OnInit {

  @Input() post: Post;
  private apiUrl: string = API_URL;

  constructor() { }

  ngOnInit() {
  }

}
