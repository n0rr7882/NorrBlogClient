import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Post, Comment } from '../blog.model';

import { PostService } from '../blog.service';
import { IPost } from "../blog.interface";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit {

  private post: Post = undefined;
  private comments: Comment[] = [];
  private postId: number = 0;

  constructor(private location: Location, private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => this.postId = Number(params['id']))
      .unsubscribe();

    if (this.postId) {
      this.postService
        .getPost(this.postId)
        .then(post => {
          console.log(post);
          this.post = new Post(post);
        })
        .catch(err => {
          this.location.back();
        });
    } else {
      this.location.back();
    }

  }

}
