
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';


import {AdminserviceService} from '../adminservice.service'

export interface DialogData {
  adminId: number;
  firstName: string;
  lastName: string;
  mobile: string;
}
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})

export class DeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public adminserviceService: AdminserviceService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.adminserviceService.deleteAdmin(this.data.adminId, this.data);

    console.log('august confirm delete')
  }
}
