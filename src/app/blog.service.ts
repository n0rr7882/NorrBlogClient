import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { MdSnackBar } from '@angular/material';

import { CookieService } from 'angular2-cookie/core';

import 'rxjs/add/operator/toPromise';

import * as _ from 'lodash';

import { User, Post, Category, Comment } from './blog.model';

import {
  IUser,
  IPost,
  ICategory,
  IComment,
  DefaultResponse,
  LoginResponse,
  UserResponse,
  UsersResponse,
  PostResponse,
  PostsResponse,
  CategoryResponse,
  CategoriesResponse,
  CommentResponse,
  CommentsResponse
} from './blog.interface';

export const API_URL = 'your_api_server_url';

@Injectable()
export class AuthService {

  private loginedUser: User = undefined;

  constructor(
    private http: HttpClient,
    private snackBar: MdSnackBar,
    private cookieService: CookieService
  ) {
    this.getMe()
      .then(user => this.loginedUser = new User(user))
      .catch(err => this.loginedUser = undefined);
  }

  // login user
  public login(id: string, pw: string): Promise<boolean> {

    return this.http
      .post<LoginResponse>(`${API_URL}/sign/login`, { "id": id, "pw": pw })
      .toPromise()
      .then(res => {
        this.loginedUser = new User(res.user);
        this.cookieService.put('ene', res.token);
        this.snackBar.open('로그인에 성공하였습니다.', 'close', { duration: 3000 });
        return true;
      })
      .catch(err => {
        let res = JSON.parse(err.error);
        this.snackBar.open(res.status.message, 'close', { duration: 3000 });
        return false;
      });
  }

  public logout(): void {
    this.loginedUser = undefined;
    this.cookieService.remove('ene');
    this.snackBar.open('성공적으로 로그아웃하였습니다.', 'close', { duration: 3000 });
  }

  public isLogin(): boolean {
    if (this.loginedUser) return true;
    else return false;
  }

  public getMe(): Promise<IUser> {

    let headers = new HttpHeaders({ 'Authorization': this.cookieService.get('ene') });

    return this.http
      .get<UserResponse>(`${API_URL}/sign/me`, { headers: headers })
      .toPromise()
      .then(res => res.user)
      .catch(err => {
        let res = JSON.parse(err.error);
        this.snackBar.open(res.status.message, 'close', { duration: 3000 });
        this.cookieService.remove('ene');
        return null;
      });
  }

}

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    private snackBar: MdSnackBar,
    private cookieService: CookieService
  ) { }

  // create user
  public createUser(user: IUser): Promise<boolean> {

    return this.http
      .post<DefaultResponse>(`${API_URL}/users`, user)
      .toPromise()
      .then(res => {
        this.snackBar.open(res.status.message, 'close', { duration: 3000 });
        return true;
      })
      .catch(err => {
        let res = JSON.parse(err.error);
        this.snackBar.open(res.status.message, 'close', { duration: 3000 });
        return false;
      });

  }

  // get one user
  public getUser(id: string): Promise<IUser> {

    return this.http
      .get<UserResponse>(`${API_URL}/users/${id}`)
      .toPromise()
      .then(res => res.user)
      .catch(err => {
        let res = JSON.parse(err.error);
        this.snackBar.open(res.status.message, 'close', { duration: 3000 });
        return null;
      });

  }

  // get users
  public getUsers(limit: number, offset: number, isAdmin?: boolean, isDenied?: boolean): Promise<IUser[]> {

    let params = new HttpParams().append('limit', limit.toString()).append('offset', String(offset));
    if (_.isBoolean(isAdmin)) params.append('isAdmin', isAdmin.toString());
    if (_.isBoolean(isDenied)) params.append('isDenied', isDenied.toString());

    return this.http
      .get<UsersResponse>(`${API_URL}/users`, { params: params })
      .toPromise()
      .then(res => res.users)
      .catch(err => {
        let res = JSON.parse(err.error);
        this.snackBar.open(res.status.message, 'close', { duration: 3000 });
        return [];
      });

  }

  // update user
  public updateUser(id: string, user: IUser): Promise<boolean> {

    let headers = new HttpHeaders({ 'Authorization': this.cookieService.get('ene') });

    return this.http
      .post<DefaultResponse>(`${API_URL}/users/${id}`, user, { headers: headers })
      .toPromise()
      .then(res => {
        this.snackBar.open(res.status.message, 'close', { duration: 3000 });
        return res.status.success;
      })
      .catch(err => {
        let res = JSON.parse(err.error);
        this.snackBar.open(res.status.message, 'close', { duration: 3000 });
        return res.status.success;
      });

  }

  public deleteUser(id: string): Promise<boolean> {

    let headers = new HttpHeaders({ 'Authorization': this.cookieService.get('ene') });

    return this.http
      .delete<DefaultResponse>(`${API_URL}/users/${id}`, { headers: headers })
      .toPromise()
      .then(res => {
        this.snackBar.open(res.status.message, 'close', { duration: 3000 });
        return res.status.success;
      })
      .catch(err => {
        let res = JSON.parse(err.error);
        this.snackBar.open(res.status.message, 'close', { duration: 3000 });
        return res.status.success;
      });

  }

}

@Injectable()
export class CategoryService {

  // create category
  public createCategory(category: Category): void {

  }

  // get one category
  public getCategory(name: string): Category {
    let category: ICategory = {
      category: 'HTML',
      userId: 'TestId1',
      creationDate: new Date()
    };

    return new Category(category);
  }

  // get categories
  public getCategories(limit: number, offset: number): Category[] {
    let category1: ICategory = {
      category: 'HTML',
      userId: 'TestId1',
      creationDate: new Date()
    };
    let category2: ICategory = {
      category: 'CSS',
      userId: 'TestId2',
      creationDate: new Date()
    };

    return [
      new Category(category1),
      new Category(category2)
    ];
  }

  // update category
  public updateCategory(name: string, newCategory: Category): void {

  }

  // delete category
  public deleteCategory(name: string): void {

  }

}

@Injectable()
export class PostService {

  public readonly NUM_OF_POSTS = 5;
  public timeline: Post[] = [];
  public offset: number = 0;

  constructor(
    private http: HttpClient,
    private snackBar: MdSnackBar,
    private cookieService: CookieService
  ) { }

  // create post
  public createPost(post: IPost): Promise<boolean> {

    let headers = new HttpHeaders({ 'Authorization': this.cookieService.get('ene') });

    return this.http
      .post<DefaultResponse>(`${API_URL}/posts`, post, { headers: headers })
      .toPromise()
      .then(res => {
        this.snackBar.open(res.status.message, 'close', { duration: 3000 });
        return res.status.success;
      })
      .catch(err => {
        let res = JSON.parse(err.error);
        this.snackBar.open(res.status.message, 'close', { duration: 3000 });
        return res.status.success;
      });

  }

  // get one post
  public getPost(id: number): Promise<IPost> {

    return this.http
      .get<PostResponse>(`${API_URL}/posts/${id}`)
      .toPromise()
      .then(res => res.post)
      .catch(err => {
        let res = JSON.parse(err.error);
        this.snackBar.open(res.status.message, 'close', { duration: 3000 });
        return null;
      });

  }

  // get posts
  public getPosts(category?: string, userId?: string): Promise<boolean> {

    let params = new HttpParams().append('limit', this.NUM_OF_POSTS.toString()).append('offset', (this.offset * this.NUM_OF_POSTS).toString());
    if (category) params.append('category', category);
    if (userId) params.append('userId', userId);

    return this.http
      .get<PostsResponse>(`${API_URL}/posts`, { params: params })
      .toPromise()
      .then(res => {
        res.posts.forEach((post, i, posts) => this.timeline.push(new Post(post)));
        this.offset += 1;
        return res.status.success;
      })
      .catch(err => {
        let res = JSON.parse(err.error);
        this.snackBar.open(res.status.message, 'close', { duration: 3000 });
        return false;
      });
  }

  // update post
  public updatePost(id: number, newPost: Post): void {

  }

  // delete post
  public deletePost(id: number): void {

  }

  public resetTimeline(): void {
    this.offset = 0;
    this.timeline = [];
  }

}

@Injectable()
export class CommentService {

  // create comment
  public createComment(comment: Comment): void {

  }

  // get one comment
  public getComment(id: number): Comment {
    let comment: IComment = {
      id: 1,
      userId: 'TestId',
      postId: 1,
      content: '이것은 테스트 코멘트이다.',
      creationDate: new Date()
    };

    return new Comment(comment);
  }

  // get comments
  public getComments(limit: number, offset: number, postId: number, userId: number): Comment[] {
    let comment1: IComment = {
      id: 1,
      userId: 'TestId1',
      postId: 1,
      content: '이것은 테스트 코멘트1이다.',
      creationDate: new Date()
    };
    let comment2: IComment = {
      id: 2,
      userId: 'TestId2',
      postId: 2,
      content: '이것은 테스트 코멘트2이다.',
      creationDate: new Date()
    };

    return [
      new Comment(comment1),
      new Comment(comment2)
    ];
  }

  // update comment
  public updateComment(id: number, newComment: Comment): void {

  }

  // delete comment
  public deleteComment(id: number): void {

  }

}
