import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PostListComponent } from './components/post-list/post-list.component';
import { CommonService } from '@app/core/services/common.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @ViewChildren('postList') postList: QueryList<PostListComponent>;

  images = [];

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.commonService.getDistricts('32').subscribe((res) => {
      this.images = res.addressDistricts.map((item) => {
        return {
          id: item.id,
          name: item.name,
          };
      });
    });  }

}
