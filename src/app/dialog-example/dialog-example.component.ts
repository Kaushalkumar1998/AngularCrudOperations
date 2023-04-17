import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ServiceService } from '../Service/service.service';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: ['./dialog-example.component.scss'],
})
export class DialogExampleComponent implements OnInit {
  public userForm!: FormGroup;

  constructor(
    private service: ServiceService,
    private formbuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogExampleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.initializForm();
  }

  ngOnInit(): void {
    if (this.data.action === 'edit') {
      this.userForm.patchValue(this.data.editData);
    }
  }

  initializForm() {
    this.userForm = this.formbuilder.group({
      name: [],
      age: [],
      address: [],
    });
  }

  saveData() {
    this.dialogRef.close(this.userForm.value);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
