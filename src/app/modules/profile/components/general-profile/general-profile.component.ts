import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
//
import { ProfileGeneralInfoModel } from '../../models/profile.model';
import { BaseModel } from '@app/shared/models/base.model';
import { ProfileService } from './../../profile.service';
import { ProfileDetailFormComponent } from './../profile-detail-form/profile-detail-form.component';
import { NotifyService } from '@app/shared/services/notify.service';

@Component({
  selector: 'app-general-profile',
  templateUrl: './general-profile.component.html',
  styleUrls: ['./general-profile.component.scss']
})
export class GeneralProfileComponent implements OnInit {
  private profileDetailFormComponent = ProfileDetailFormComponent;
  profileGeneralInfo: ProfileGeneralInfoModel = new ProfileGeneralInfoModel();

  constructor(
    public dialog: MatDialog,
    private profileService: ProfileService,
    private notifyService: NotifyService
  ) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.profileService
      .getProfileGeneralInfo()
      .subscribe((res: ProfileGeneralInfoModel) => {
        this.profileGeneralInfo = res;
      }, (err) => {
        this.notifyService.notify(err);
      });
  }

  onEditProfileButtonClicked() {
    const dialogRef = this.dialog.open(this.profileDetailFormComponent, {
      width: '70vw',
      maxHeight: '90vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getProfile();
    });
  }
}
