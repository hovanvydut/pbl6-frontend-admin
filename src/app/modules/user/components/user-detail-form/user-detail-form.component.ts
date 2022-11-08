import { Component, Inject, OnInit } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
//
import { InputType, FieldType } from '@app/shared/app.enum';
import { UserAccountModel, UserRequestModel } from '../../models';
import { FormControlBaseModel } from '@app/shared/models/form.model';
import { UserService } from '@app/modules/user/services';
import { NotifyService } from '@app/shared/services/notify.service';
import { RoleService } from '@app/modules/role/services';
import { ItemModel } from '@app/shared/models/base.model';
import { finalize } from 'rxjs';
import {
  UserGroupName,
  UserFieldNameEnum,
  UserAuthEnum,
  UserAccessEnum,
} from '../../enums';

@Component({
  selector: 'app-user-detail-form',
  templateUrl: './user-detail-form.component.html',
  styleUrls: ['./user-detail-form.component.scss']
})
export class UserDetailFormComponent implements OnInit {
  user: UserRequestModel = new UserRequestModel();
  userDetail: UserAccountModel = new UserAccountModel();
  roleList: ItemModel[] = [];
  FieldType = FieldType;

  formControl: FormControlBaseModel[] = [
    {
      groupName: UserGroupName.AuthInfo,
      items: [
        {
          id: UserAuthEnum.Email,
          name: UserFieldNameEnum.Email,
          label: 'Email',
          placeholder: 'Email',
          require: true,
          value: new FormControl({ value: '', disabled: true }, Validators.required),
          inputType: InputType.Text,
          fieldType: FieldType.Input,
          width: 'full',
          disabled: true,
        },
        {
          id: UserAuthEnum.IsVerified,
          name: UserFieldNameEnum.IsVerified,
          label: 'Đã xác thực email',
          placeholder: 'Nhập mô tả về vai trò',
          require: true,
          value: new FormControl({ value: '', disabled: true }, Validators.required),
          inputType: InputType.Text,
          fieldType: FieldType.Toggle,
          width: 'full',
          disabled: true,
        },
      ]
    },
    {
      groupName: UserGroupName.AccessInfo,
      items: [
        {
          id: UserAccessEnum.IsActived,
          name: UserFieldNameEnum.IsActived,
          label: 'Kích hoạt',
          placeholder: 'Kích hoạt tài khoản ',
          require: true,
          value: new FormControl({ value: this.userDetail.isActived, disabled: false }, Validators.required),
          inputType: InputType.Text,
          fieldType: FieldType.Toggle,
          width: 'full',
        },
        {
          id: UserAccessEnum.RoleId,
          name: UserFieldNameEnum.RoleId,
          label: 'Vai trò',
          placeholder: 'Chọn vai trò',
          require: true,
          value: new FormControl({ value: this.userDetail.roleId, disabled: false }, Validators.required),
          inputType: InputType.Text,
          fieldType: FieldType.Select,
          width: 'full',
          properties: this.roleList,
        }
      ]
    },
  ];
  authInfoIndex: number;
  accessInfoIndex: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { userId: string },
    private dialog: Dialog,
    private notifyService: NotifyService,
    private userService: UserService,
    private roleService: RoleService,
  ) {
    this.handleFormFieldIndex();
  }

  ngOnInit() {
    this.getRoles();
    if (this.data?.userId) {
      this.getEditUserInfo(this.data.userId);
    }
  }

  getRoles() {
    this.roleService.getAllRoles().pipe(finalize(() => { })).subscribe(data => {
      this.roleList = data;
      this.formControl[this.accessInfoIndex].items[1].properties = this.roleList;
    });
  }

  getEditUserInfo(userId: string) {
    this.userService.getUserById(userId).subscribe(res => {
      this.userDetail = res;
      this.convertPostToFormControl();
    });
  }

  convertPostToFormControl() {
    this.formControl.forEach(group => {
      group.items.forEach(item => {
        item.value.setValue(this.userDetail[item.name]);
      });
    });
  }

  handleFormFieldIndex() {
    this.formControl.forEach((group, idx) => {
      switch (group.groupName) {
        case UserGroupName.AuthInfo:
          this.authInfoIndex = idx;
          break;
        case UserGroupName.AccessInfo:
          this.accessInfoIndex = idx;
          break;
      }
    });
  }

  onFieldChanged(item: { type: string; value: any }) {
    switch (item.type) {
      case UserFieldNameEnum.IsActived:
        this.formControl[this.accessInfoIndex].items[0].value.setValue(item.value);
        break;
      case UserFieldNameEnum.RoleId:
        this.formControl[this.accessInfoIndex].items[1].value.setValue(item.value);
        break;
    }
  }

  onSaveButtonClicked() {
    let data: UserRequestModel = new UserRequestModel();
    this.formControl.forEach(group => {
      group.items.forEach(item => {
        data[item.name] = item.value.value;
      });
    });
    if (this.data?.userId) {
      data.id = parseInt(this.data.userId);
      this.updateUser(data);
    }
  }

  updateUser(data: UserRequestModel) {
    this.userService
      .updateUser(data)
      .subscribe(
        () => {
          this.dialog.closeAll();
          this.notifyService.notify('Cập nhật tài khoản người dùng thành công');
        },
        (err) => {
          this.notifyService.notify(err);
        }
      );
  }
}
