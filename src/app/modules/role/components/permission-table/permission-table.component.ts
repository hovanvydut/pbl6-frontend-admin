import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionBaseModel, PermissionGroupModel, PermissionRequestModel } from '../../models';
import { MatTableDataSource } from '@angular/material/table';
import { PermissionService } from './../../services';
import { NotifyService } from '@app/shared/services/notify.service';

@Component({
  selector: 'app-permission-table',
  templateUrl: './permission-table.component.html',
  styleUrls: ['./permission-table.component.scss']
})
export class PermissionTableComponent implements OnInit, AfterViewInit {
  private _forceUpdate: boolean = false;
  @Input() set forceUpdate(value: boolean) {
    if (value) {
      this.getPermissions();
    }
    this._forceUpdate = false;
  }

  displayedColumns: string[] = [
    'key',
    'description',
    'action',
  ];
  tableName: string = 'Tất cả quyền truy cập của vai trò';
  dataSource: MatTableDataSource<PermissionBaseModel> = new MatTableDataSource();

  dataGroup = {};
  dataModule = [];
  selectedModule: string = '';

  roleId: number;

  constructor(
    private permissionService: PermissionService,
    private notifyService: NotifyService,
    private router: Router,
  ) {
    const currentUrl = this.router.url.split('/');
    this.roleId = parseInt(currentUrl[currentUrl.length - 2]);
  }

  ngOnInit(): void {
    this.getPermissions();
  }

  ngAfterViewInit() {
  }

  getPermissions() {
    this.permissionService.getPermissions(this.roleId).subscribe(data => {
      const dataModule = [];
      const dataGroup = {};
      data.forEach((d: PermissionGroupModel) => {
        dataModule.push({
          key: d.key,
          value: d.key,
        });
        dataGroup[d.key] = d.children;
      });
      this.dataModule = dataModule;
      this.dataGroup = dataGroup;
      if (!this.selectedModule) {
        this.selectedModule = this.dataModule[0].key;
      }
      this.dataSource = new MatTableDataSource<PermissionBaseModel>(this.dataGroup[this.selectedModule]);
    });
  }

  filterPermissions(event){
    this.dataSource = new MatTableDataSource<PermissionBaseModel>(this.dataGroup[this.selectedModule]);
  }

  onAddPermisison(element) {
    const newPermission = new PermissionRequestModel({
      key: element.key,
      description: element.description,
      roleId: this.roleId,
    });
    this.permissionService
      .addPermission(newPermission)
      .subscribe(
        () => {
          this.notifyService.notify('Thêm quyền truy cập thành công');
          this.getPermissions();
        },
        (err) => {
          this.notifyService.notify(err);
        }
      );
  }

  onRemovePermisison(permissionId) {
    this.permissionService
      .removeRole(this.roleId, permissionId)
      .subscribe(
        () => {
          this.notifyService.notify('Gỡ bỏ quyền truy cập thành công');
          this.getPermissions();
        },
        (err) => {
          this.notifyService.notify(err);
        }
      );
  }
}