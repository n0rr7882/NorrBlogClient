import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../blog.model';
import { API_URL } from '../blog.service';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css']
})

export class DetailPostComponent implements OnInit {

  @Input() post: Post;
  private apiUrl: string = API_URL;

  constructor() { }

  ngOnInit() { }

}
