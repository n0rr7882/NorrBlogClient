import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User, Category } from './blog.model';

import { CategoryService, AuthService, PostService } from './blog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private categories: Category[];
  private loginUser: User;

  constructor(
    private authService: AuthService,
    private categoryService: CategoryService,
    private postService: PostService,
    private router: Router
  ) {
    this.getCategories();
  }

  public getCategories(): void {
    this.categories = this.categoryService.getCategories(1, 2);
  }

  public setLoginedUser(user: User): void {
    this.loginUser = user;
  }

  public logoutUser(): void {
    this.loginUser = undefined;
  }

  public refresh() {
    this.postService.resetTimeline();
    this.postService.getPosts();
  }

  title = 'app';
}
