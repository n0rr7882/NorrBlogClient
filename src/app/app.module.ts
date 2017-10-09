import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatCardModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatProgressBarModule
} from '@angular/material';

import { CookieService } from 'angular2-cookie/services/cookies.service';

import { AppComponent } from './app.component';

import {
  AuthService,
  UserService,
  PostService,
  CategoryService,
  CommentService
} from './blog.service';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LoginInfoComponent } from './login-info/login-info.component';
import { SimplePostComponent } from './simple-post/simple-post.component';
import { SimplePostListComponent } from './simple-post-list/simple-post-list.component';
import { DetailPostComponent } from './detail-post/detail-post.component';
import { ArticleComponent } from './article/article.component';
import { CommentsComponent } from './comments/comments.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    LoginInfoComponent,
    SimplePostComponent,
    SimplePostListComponent,
    DetailPostComponent,
    ArticleComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatProgressBarModule,

    RouterModule.forRoot([
      { path: '', redirectTo: 'posts', pathMatch: 'full' },
      { path: 'posts', component: SimplePostListComponent },
      { path: 'article', component: ArticleComponent },
      { path: '**', redirectTo: 'posts' }
    ])
  ],
  exports: [
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
  providers: [
    AuthService,
    UserService,
    PostService,
    CategoryService,
    CommentService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
