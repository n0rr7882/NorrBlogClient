import { IUser, IPost, ICategory, IComment } from './blog.interface';

export class User implements IUser {
    public id: string;
    public pw: string;
    public name: string;
    public email: string;
    public creationDate: Date;
    public isAdmin: boolean;
    public isDenied: boolean;

    constructor(user?: IUser) {
        this.id = user && user.id || null;
        this.pw = user && user.pw || null;
        this.name = user && user.name || null;
        this.email = user && user.email || null;
        this.creationDate = user && new Date(user.creationDate) || null;
        this.isAdmin = user && user.isAdmin || null;
        this.isDenied = user && user.isDenied || null;
    }
}

export class Post {
    public id: number;
    public userId: string;
    public category: string;
    public title: string;
    public views: number;
    public numOfComments: number;
    public content: string;
    public creationDate: Date;

    constructor(post?: IPost) {
        this.id = post && post.id || null;
        this.userId = post && post.userId || null;
        this.category = post && post.category || null;
        this.title = post && post.title || null;
        this.views = post && post.views || null;
        this.numOfComments = post && post.numOfComments || null;
        this.content = post && post.content || null;
        this.creationDate = post && new Date(post.creationDate) || null;
    }
}

export class Comment {
    public id: number;
    public userId: string;
    public postId: number;
    public content: string;
    public creationDate: Date;

    constructor(comment?: IComment) {
        this.id = comment && comment.id || null;
        this.userId = comment && comment.userId || null;
        this.postId = comment && comment.postId || null;
        this.content = comment && comment.content || null;
        this.creationDate = comment && new Date(comment.creationDate) || null;
    }
}

export class Category {
    public category: string;
    public userId: string;
    public creationDate: Date;

    constructor(category?: ICategory) {
        this.category = category && category.category || null;
        this.userId = category && category.userId || null;
        this.creationDate = category && new Date(category.creationDate) || null;
    }
}