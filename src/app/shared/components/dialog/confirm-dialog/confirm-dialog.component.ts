import { Component, OnInit, Inject, HostListener } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import { DIALOG_BUTTON, DIALOG_MESSAGE } from '@app/shared/app.constants';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  DIALOG_MESSAGE = DIALOG_MESSAGE;

  message: string = DIALOG_MESSAGE.DELETE_CONFIRM;
  confirmButtonText = DIALOG_BUTTON.OK;
  cancelButtonText = DIALOG_BUTTON.CANCEL;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  @HostListener('document:keyup.escape') onClose() {
    this.onCancelClick();
  }

  ngOnInit(): void {}

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}
