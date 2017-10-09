export interface Status {
    success: boolean;
    message: string;
}

export interface IUser {
    id: string;
    pw: string;
    name: string;
    email: string;
    creationDate: Date;
    isAdmin: boolean;
    isDenied: boolean;
}

export interface IPost {
    id: number;
    userId: string;
    category: string;
    title: string;
    views: number;
    numOfComments: number;
    content: string;
    creationDate: Date;
}

export interface ICategory {
    category: string;
    userId: string;
    creationDate: Date;
}

export interface IComment {
    id: number;
    userId: string;
    postId: number;
    content: string;
    creationDate: Date;
}

export interface DefaultResponse {
    status: Status;
}

export interface LoginResponse {
    status: Status;
    user;
    token: string;
}

export interface UserResponse {
    status: Status;
    user: IUser;
}

export interface UsersResponse {
    status: Status;
    users: IUser[];
}

export interface PostResponse {
    status: Status;
    post: IPost;
}

export interface PostsResponse {
    status: Status;
    posts: IPost[];
}

export interface CategoryResponse {
    status: Status;
    category: ICategory;
}

export interface CategoriesResponse {
    status: Status;
    categories: ICategory[];
}

export interface CommentResponse {
    status: Status;
    comment: IComment;
}

export interface CommentsResponse {
    status: Status;
    comments: IComment[];
}