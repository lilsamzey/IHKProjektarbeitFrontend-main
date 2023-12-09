import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { LeaveRequestService } from "../../leave-request.service";
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from "@angular/forms";
import { LeaveRequest } from "../../leave-request.model";
import { MAT_DATE_LOCALE } from "@angular/material/core";

export interface DialogData {
  id: number;
  action: string;
  leaveRequest1: LeaveRequest;
}

@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.scss"],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "en-GB" }],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  leaveRequestForm1: UntypedFormGroup;
  leaveRequest1: LeaveRequest;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public leaveRequestService: LeaveRequestService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = "Edit Leave Request";
      this.leaveRequest1 = data.leaveRequest1;
    } else {
      this.dialogTitle = "New Leave Request";
      const blankObject = {} as LeaveRequest;
      this.leaveRequest1 = new LeaveRequest(blankObject);
    }
    this.leaveRequestForm1 = this.createContactForm();
  }
  formControl1 = new UntypedFormControl("", [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl1.hasError("required")
      ? "Required field"
      : this.formControl1.hasError("email")
      ? "Not a valid email"
      : "";
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.leaveRequest1.id],
      class: [this.leaveRequest1.class, [Validators.required]],
      section: [this.leaveRequest1.section, [Validators.required]],
      applyDate: [this.leaveRequest1.applyDate, [Validators.required]],
      fromDate: [this.leaveRequest1.fromDate, [Validators.required]],
      toDate: [this.leaveRequest1.toDate, [Validators.required]],
      status: [this.leaveRequest1.status, [Validators.required]],
      reason: [this.leaveRequest1.reason, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.leaveRequestService.addLeaveRequest(
      this.leaveRequestForm1.getRawValue()
    );
  }
}
