import { Component, Inject, OnInit } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
//
import { InputType, FieldType } from '@app/shared/app.enum';
import { RoleRequestModel } from '../../models';
import { FormControlBaseModel } from '@app/shared/models/form.model';
import { RoleService } from '@app/modules/role/services';
import { NotifyService } from '@app/shared/services/notify.service';

@Component({
  selector: 'app-role-detail-form',
  templateUrl: './role-detail-form.component.html',
  styleUrls: ['./role-detail-form.component.scss']
})
export class RoleDetailFormComponent implements OnInit {
  role: RoleRequestModel = new RoleRequestModel();
  roleDetail: RoleRequestModel = new RoleRequestModel();
  FieldType = FieldType;

  formControl: FormControlBaseModel[] = [
    {
      groupName: "Thông tin vai trò",
      items: [
        {
          name: "name",
          label: 'Tên vai trò',
          placeholder: 'Tên vai trò',
          require: true,
          value: new FormControl('', Validators.required),
          inputType: InputType.Text,
          fieldType: FieldType.Input,
          width: 'full'
        },
        {
          name: "description",
          label: 'Mô tả chung',
          placeholder: 'Nhập mô tả về vai trò',
          require: true,
          value: new FormControl('', Validators.required),
          inputType: InputType.Text,
          fieldType: FieldType.Textarea,
          width: 'full'
        }
      ]
    },
  ];
  generalInfoGroupIndex: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { roleId: string },
    private dialog: Dialog,
    private notifyService: NotifyService,
    private roleService: RoleService
  ) {
    this.handleFormFieldIndex();
  }

  ngOnInit() {
    if (this.data?.roleId) {
      this.getEditRoleInfo(this.data.roleId);
    }
  }

  getEditRoleInfo(roleId: string) {
    this.roleService.getRoleById(roleId).subscribe(res => {
      this.roleDetail = res;
      this.convertPostToFormControl();
    });
  }

  convertPostToFormControl() {
    this.formControl.forEach(group => {
      group.items.forEach(item => {
        item.value.setValue(this.roleDetail[item.name]);
      });
    });
  }

  handleFormFieldIndex() {
    this.formControl.forEach((group, idx) => {
      switch (group.groupName) {
        case "Thông tin vai trò":
          this.generalInfoGroupIndex = idx;
          break;
      }
    });
  }

  onSaveButtonClicked() {
    let data: RoleRequestModel = new RoleRequestModel();
    this.formControl.forEach(group => {
      group.items.forEach(item => {
        data[item.name] = item.value.value;
      });
    });
    if (this.data?.roleId) {
      data.id = parseInt(this.data.roleId);
      this.updateRole(data);
    } else {
      this.createRole(data);
    }
  }

  updateRole(data: RoleRequestModel) {
    this.roleService
      .updateRole(
        new RoleRequestModel({
          ...data
        })
      )
      .subscribe(
        () => {
          this.dialog.closeAll();
          this.notifyService.notify('Cập nhật vai trò thành công');
        },
        (err) => {
          this.notifyService.notify(err);
        }
      );
  }

  createRole(data: RoleRequestModel) {
    this.roleService
      .createNewRole(
        new RoleRequestModel({
          ...data
        })
      )
      .subscribe(
        () => {
          this.dialog.closeAll();
          this.notifyService.notify('Tạo vai trò thành công');
        },
        (err) => {
          this.notifyService.notify(err);
        }
      );
  }
}
