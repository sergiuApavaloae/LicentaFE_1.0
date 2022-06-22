import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../dialog/dialog.component';
import { PinService } from '../pin.service';

export interface DialogReadOnly {
  destination: string;
  userName:string;
  pinId:string;
  deleted:boolean;
  userId:string;
}

@Component({
  selector: 'app-dialog-read-only',
  templateUrl: './dialog-read-only.component.html',
  styleUrls: ['./dialog-read-only.component.css']
})
export class DialogReadOnlyComponent{

  constructor(
    public dialogRef: MatDialogRef<DialogReadOnlyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogReadOnly,
    private pinService:PinService
  ) {
    if(localStorage.getItem('user')==='admin' || localStorage.getItem('userId')===this.data.userId)
      this.showDelete=true
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  showDelete=false

}
