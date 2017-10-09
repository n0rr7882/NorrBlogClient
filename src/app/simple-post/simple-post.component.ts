import { Component, OnInit, Input } from '@angular/core';

import { Post } from '../blog.model';

@Component({
  selector: 'app-simple-post',
  templateUrl: './simple-post.component.html',
  styleUrls: ['./simple-post.component.css']
})
export class SimplePostComponent implements OnInit {

  @Input() post: Post;

  constructor() { }

  ngOnInit() {
  }

}
