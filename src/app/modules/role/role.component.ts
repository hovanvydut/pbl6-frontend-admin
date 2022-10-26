import { Component, OnInit } from '@angular/core';
import { CommonService } from '@app/core/services/common.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  images = [];

  constructor(private commonService: CommonService) { }

  ngOnInit() {
  }

}
