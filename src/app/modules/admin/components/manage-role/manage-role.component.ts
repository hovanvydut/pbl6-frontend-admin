import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
//
import { RoleDetailFormComponent } from '@app/modules/role/components/role-detail-form/role-detail-form.component';
import { RoleTableComponent } from '@app/modules/role/components/role-table/role-table.component';

@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.scss']
})
export class ManageRoleComponent implements OnInit {
  @ViewChild('roleTable') roleTableComponent: RoleTableComponent;
  roleDetailFormComponent = RoleDetailFormComponent;
  forceUpdate: boolean = false;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  onAddNewRoleButtonClicked(){
    let dialogRef = this.dialog.open(this.roleDetailFormComponent, {
      width: '70vw',
      maxHeight: '90vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.roleTableComponent.getRoles();
    });
  }

  handleEditRole(roleId: any) {
    if (roleId) {
      let dialogRef = this.dialog.open(this.roleDetailFormComponent, {
        width: '70vw',
        maxHeight: '90vh',
        data: { roleId: roleId }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.roleTableComponent.getRoles();
      });
    }
  }
}
