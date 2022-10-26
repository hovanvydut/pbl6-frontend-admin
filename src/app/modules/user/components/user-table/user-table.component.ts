import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit, ViewChild } from '@angular/core';
import { UserService } from './../../services/user.service';
import { UserBaseModel, QueryParams } from '../../models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { RoleDetailFormComponent } from '@app/modules/role/components/role-detail-form/role-detail-form.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit, AfterViewInit {
  @ViewChild('matPaginator') paginator: MatPaginator;
  private _forceUpdate: boolean = false;
  @Input() set forceUpdate(value: boolean) {
    if (value) {
      this.getUsers();
    }
    this._forceUpdate = false;
  }

  roleDetailFormComponent = RoleDetailFormComponent;

  tableName: string = 'Tất cả người dùng trong hệ thống';
  displayedColumns: string[] = [
    'avatar',
    'displayName',
    'email',
    'phoneNumber',
    'identityNumber',
    'address',
    'action'
  ];
  totalPosts: number = 0;
  queryParams: QueryParams = new QueryParams({
    pageNumber: 1,
    pageSize: 10,
    searchValue: '',
  })

  dataSource: MatTableDataSource<UserBaseModel> = new MatTableDataSource();

  constructor(
    private userService: UserService,
  )
  {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  pageChangeEvent(event: { pageIndex: number, pageSize: number }) {
    this.queryParams.pageSize = event.pageSize;
    this.queryParams.pageNumber = event.pageIndex + 1;
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers(this.queryParams).subscribe(data => {
      this.dataSource = new MatTableDataSource<UserBaseModel>(data.records);
      this.totalPosts = data.totalRecords;
    });
  }
}
