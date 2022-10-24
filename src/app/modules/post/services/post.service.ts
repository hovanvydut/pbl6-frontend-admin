import { Injectable } from '@angular/core';
import { BaseModel, DatasourceBaseModel } from '@app/shared/models/base.model';
import { of, Observable } from 'rxjs';
//
import { BaseService } from 'src/app/core/services/base.service';
import { PostRequestModel, PostBaseModel } from './../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private baseService: BaseService) {}

  getPosts(): Observable<DatasourceBaseModel<PostBaseModel>> {
    return this.baseService.get(`post`);
  }

  getPostById(id: string): Observable<PostBaseModel> {
    return this.baseService.get<PostBaseModel>(`post/${id}`);
  }

  deletePost(id: string) {
    return this.baseService.delete(`post/${id}`);
  }

  createNewPost(post: PostRequestModel): Observable<void> {
    return this.baseService.post(`post`, post);
  }

  updatePost(post: PostRequestModel): Observable<void> {
    return this.baseService.put(`post/${post.id}`, post);
  }
}
