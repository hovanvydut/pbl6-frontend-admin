import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from './../../services/role.service';
import { RoleBaseModel, QueryParams } from '../../models/role.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ENDPOINTS } from '@app/shared/utilities';

import { RoleDetailFormComponent } from '@app/modules/role/components';

@Component({
  selector: 'app-role-table',
  templateUrl: './role-table.component.html',
  styleUrls: ['./role-table.component.scss']
})
export class RoleTableComponent implements OnInit, AfterViewInit {
  @ViewChild('matPaginator') paginator: MatPaginator;
  private _forceUpdate: boolean = false;
  @Input() set forceUpdate(value: boolean) {
    if (value) {
      this.getRoles();
    }
    this._forceUpdate = false;
  }
  @Output() onEditRole = new EventEmitter<string>();

  roleDetailFormComponent = RoleDetailFormComponent;

  tableName: string = 'Tất cả vai trò trong hệ thống';
  displayedColumns: string[] = [
    'name',
    'description',
    'action',
  ];
  totalPosts: number = 0;
  queryParams: QueryParams = new QueryParams({
    pageNumber: 1,
    pageSize: 10,
    searchValue: '',
  })

  dataSource: MatTableDataSource<RoleBaseModel> = new MatTableDataSource();

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private roleService: RoleService,
  ) { }

  ngOnInit(): void {
    this.getRoles();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  pageChangeEvent(event: { pageIndex: number, pageSize: number }) {
    this.queryParams.pageSize = event.pageSize;
    this.queryParams.pageNumber = event.pageIndex + 1;
    this.getRoles();
  }

  getRoles() {
    this.roleService.getRoles(this.queryParams).subscribe(data => {
      this.dataSource = new MatTableDataSource<RoleBaseModel>(data.records);
      this.totalPosts = data.totalRecords;
    });
  }

  onManagePermissionButtonClicked(roleId: string) {
    this.router.navigate([`${ENDPOINTS.MANAGE_ROLE}/${roleId}/manage-permission`]);
  }

  onEditRoleButtonClicked(roleId: string) {
    if (roleId) {
      let dialogRef = this.dialog.open(this.roleDetailFormComponent, {
        width: '35vw',
        maxHeight: '90vh',
        data: { roleId: roleId }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getRoles();
      });
    }
  }
}
