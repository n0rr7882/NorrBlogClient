import { Component, OnInit, Input } from '@angular/core';

import { Post } from '../blog.model';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css']
})

export class DetailPostComponent implements OnInit {

  @Input() post: Post;

  constructor() { }

  ngOnInit() {
    console.log(this.post);
  }

}
