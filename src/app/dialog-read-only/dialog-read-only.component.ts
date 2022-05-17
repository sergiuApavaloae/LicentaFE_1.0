import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../dialog/dialog.component';
import { PinService } from '../pin.service';

export interface DialogReadOnly {
  destination: string;
  userName:string
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
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}