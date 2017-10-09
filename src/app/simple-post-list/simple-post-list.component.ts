import { Component, OnInit } from '@angular/core';

import { Post } from '../blog.model';

import { PostService } from '../blog.service';
import { IPost } from "../blog.interface";

@Component({
  selector: 'app-simple-post-list',
  templateUrl: './simple-post-list.component.html',
  styleUrls: ['./simple-post-list.component.css']
})
export class SimplePostListComponent implements OnInit {

  private isLoading: boolean = false;

  constructor(private postService: PostService) { }

  ngOnInit() {
    if (this.postService.offset === 0)
      this.getMorePosts();
  }

  public getMorePosts() {
    this.isLoading = true;
    this.postService
      .getPosts()
      .then(success => this.isLoading = false)
      .catch(err => this.isLoading = false);

  }

}
