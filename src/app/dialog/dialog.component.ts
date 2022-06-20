import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ReportType } from '../shared/pin';

export interface DialogData {
  description: string;
  image: string;
  type:string
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent  {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    
  }
  Streets=ReportType.Streets
  Salubrity=ReportType.Salubrity
  Parks=ReportType.Parks
  Traffic=ReportType.Traffic
  Beautiful=ReportType.Beautiful
  Animals=ReportType.Animals
  Other=ReportType.Other

  onNoClick(): void {
    this.dialogRef.close();
  }
}
