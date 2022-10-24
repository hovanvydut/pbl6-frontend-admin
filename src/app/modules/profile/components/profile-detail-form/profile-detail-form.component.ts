import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { FormControl } from '@angular/forms';
import { finalize } from 'rxjs';
//
import { BaseModel } from '@app/shared/models/base.model';
import { ProfileModel, ProfileUpdateModel } from '../../models/profile.model';
import { ProfileService } from '../../profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from '@app/core/services/common.service';
import { InputType } from '@app/shared/app.enum';
import { FieldType } from '@app/modules/post/enums/post.enum';
import { NotifyService } from '@app/shared/services/notify.service';

@Component({
  selector: 'app-profile-detail-form',
  templateUrl: './profile-detail-form.component.html',
  styleUrls: ['./profile-detail-form.component.scss']
})
export class ProfileDetailFormComponent implements OnInit {
  FieldType = FieldType;
  avatarUrl: string = '';
  formControl = [
    {
      items: [
        {
          name: 'avatar',
          label: 'Anh đại diện',
          placeholder: 'Tải lên ảnh đại diện',
          require: true,
          value: new FormControl(''),
          inputType: InputType.Text,
          fieldType: FieldType.Image,
          width: '1/3'
        },
        {
          name: 'displayName',
          label: 'Họ và tên',
          placeholder: 'Nhập họ và tên',
          require: true,
          value: new FormControl(''),
          inputType: InputType.Text,
          fieldType: FieldType.Input,
          width: 'full'
        },

        {
          name: 'phoneNumber',
          label: 'Số điện thoại',
          placeholder: 'Nhập số điện thoại',
          require: true,
          value: new FormControl(''),
          inputType: InputType.Text,
          fieldType: FieldType.Input,
          width: 'full'
        },
        {
          name: 'identityNumber',
          label: 'Căn cước công dân',
          placeholder: 'Nhập số căn cước công dân',
          require: true,
          value: new FormControl({ value: '', disabled: true }),
          inputType: InputType.Text,
          fieldType: FieldType.Input,
          width: 'full',
          disable: true
        },
        {
          name: 'userAccountEmail',
          label: 'Địa chỉ email',
          placeholder: 'Nhập địa chỉ email',
          require: true,
          value: new FormControl({ value: '', disabled: true }),
          inputType: 'email',
          fieldType: FieldType.Input,
          width: 'full',
          disable: true
        }
      ]
    }
  ];

  constructor(
    private dialog: Dialog,
    private notifyService: NotifyService,
    private profileService: ProfileService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.profileService
      .getProfileInfo()
      .subscribe((res: ProfileModel) => {
        if (res) {
          this.formControl.forEach(group => {
            group.items.forEach(item => {
              item.value.setValue(res[item.name]);
            });
            this.avatarUrl = res.avatar;
          });
        }
      }, (err) => {
        this.notifyService.notify(err);
      });
  }

  onUpdateProfileInfo() {
    let data: any = {} as ProfileUpdateModel;
    this.formControl.forEach(group => {
      group.items.forEach(item => {
        data[item.name] = item.value.value;
      });
    });
    this.profileService
      .updateProfileInfo(
        new ProfileUpdateModel({
          displayName: data.displayName,
          phoneNumber: data.phoneNumber,
          address: '123',
          addressWardId: '1',
          avatar: this.avatarUrl
        })
      )
      .pipe(finalize(() => {}))
      .subscribe(
        () => {
          this.dialog.closeAll();
          this.notifyService.notify('Cập nhật thông tin thành công');
        },
        (err) => {
          this.notifyService.notify(err);
        }
      );
  }

  onUpdateAvatar(e) {
    let images = e.target.files;
    if (images && images.length > 1) {
    } else {
      let image = images[0];
      this.commonService.uploadImage(image).subscribe(res => {
        this.avatarUrl = res;
      });
    }
  }
}
