import { Component, OnInit, Output, EventEmitter, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PostService } from './../../services/post.service';
import { ConfirmDialogComponent } from './../../../../shared/components/dialog/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PostDetailFormComponent } from './../post-detail-form/post-detail-form.component';
import { MatPaginator } from '@angular/material/paginator';
import { PostBaseModel } from '../../models/post.model';

@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.scss']
})
export class PostTableComponent implements OnInit, AfterViewInit {
  @ViewChild('matPaginator') paginator: MatPaginator;
  private _forceUpdate: boolean = false;
  @Input() set forceUpdate(value: boolean) {
    if (value) {
      this.getPosts();
    }
    this._forceUpdate = false;
  }
  @Output() onEditPost = new EventEmitter<string>();

  postDetailFormComponent = PostDetailFormComponent;
  tableName: string = 'Tất cả bài đăng';
  displayedColumns: string[] = [
    'medias',
    'title',
    'area',
    'price',
    'category',
    'address',
    'action'
  ];
  dataSource: MatTableDataSource<PostBaseModel> = new MatTableDataSource();

  constructor(
    private dialog: MatDialog,
    private postService: PostService)
  {}

  ngOnInit(): void {
    this.getPosts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getPosts() {
    this.postService.getPosts().subscribe(data => {
      this.dataSource = new MatTableDataSource<PostBaseModel>(data.records);
    });
  }

  onDeletePostButtonClicked(postId: string) {
    if (postId) {
      let dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '250px',
        data: {
          message: 'Xác nhận xoá'
        }
      });
      dialogRef.afterClosed().subscribe(confirm => {
        if (confirm) {
          this.postService.deletePost(postId).subscribe(data => {
            this.getPosts();
          });
          this.postService.deletePost(postId).subscribe(data => {
            this.getPosts();
          });
        }
      });
    }
  }

  onEditPostButtonClicked(postId: string) {
    if (postId) {
      let dialogRef = this.dialog.open(this.postDetailFormComponent, {
        width: '70vw',
        maxHeight: '90vh',
        data: { postId: postId }
      });
    dialogRef.afterClosed().subscribe(result => {
        this.getPosts();
      });
    }
  }
}
