import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { PostBaseModel } from './../../models/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input() type: 'small' | 'large' = 'small';
  posts: PostBaseModel[] = [];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe((res) => {
      this.posts = res.records;
    });
  }

}
