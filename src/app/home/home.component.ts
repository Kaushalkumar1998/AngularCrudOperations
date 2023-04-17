import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from '../Service/service.service';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = 'project';
  allusers: any = [];
  id: any = [];
  filteredList: any = [];
  filterControl = new FormControl();

  constructor(
    public dialog: MatDialog,
    @Inject(ServiceService) private service: ServiceService
  ) {}

  ngOnInit(): void {
    this.getAllUser();
    this.onFilter();
  }

  getAllUser() {
    this.service.getAll().subscribe((allUsers: any) => {
      this.allusers = [];
      this.filteredList = [];
      this.allusers = allUsers;
      this.filteredList = this.allusers;
    });
  }

  openDialog(action: string, editData: any) {
    const dialogRef = this.dialog.open(DialogExampleComponent, {
      data: {
        action: action,
        editData: editData,
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (action === 'add' && result != null) {
        this.service.postUser(result).subscribe(() => this.getAllUser());
      } else if (action === 'edit' && result != null) {
        result.id = editData.id;
        this.service.updateUser(result).subscribe(() => this.getAllUser());
      }
    });
  }

  deleteDialogOpen(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    action: string,
    deleteData: any
  ) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: {
        action: action,
        deleteData: deleteData,
      },
      disableClose: true,
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (action === 'delete' && result != null) {
        result = deleteData;
        this.service.deleteData(result).subscribe(() => this.getAllUser());
      }
    });
  }

  onFilter() {
    this.filterControl.valueChanges.subscribe((res) => {
      if (res != '') {
        this.filteredList = this.allusers.filter((ele: any) =>
          ele.name.toLowerCase().includes(res.toLowerCase())
        );
      } else {
        this.filteredList = this.allusers;
      }
    });
  }

  onClearFilter() {
    this.filteredList = this.allusers;
    this.filterControl.setValue('');
  }
}
