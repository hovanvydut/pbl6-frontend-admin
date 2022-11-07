import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { UserService } from './../../services';
import { UserBaseModel, QueryParams } from '../../models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { UserDetailFormComponent } from '@app/modules/user/components';

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

  userDetailFormComponent = UserDetailFormComponent;

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
    private dialog: MatDialog,
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

  onEditUserButtonClicked(userId: string) {
    if (userId) {
      let dialogRef = this.dialog.open(this.userDetailFormComponent, {
        width: '35vw',
        maxHeight: '90vh',
        data: { userId: userId }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getUsers();
      });
    }
  }
}
