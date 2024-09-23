import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-errors-modal',
  templateUrl: './errors-modal.component.html',
  styleUrls: ['./errors-modal.component.css']
})
export class ErrorsModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { errors: string[] },
              public dialogRef: MatDialogRef<ErrorsModalComponent>) {}


  close() {
    this.dialogRef.close();
  }

  submit(){
    this.dialogRef.close({event:'Continue'});
  }
}
