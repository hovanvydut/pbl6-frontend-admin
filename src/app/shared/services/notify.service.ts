import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  constructor(public snackBar: MatSnackBar) { }

  public notify(message: string, time: number = 2000) {
    this.snackBar.open(message, '', {
      duration: time
    });
  }
}
