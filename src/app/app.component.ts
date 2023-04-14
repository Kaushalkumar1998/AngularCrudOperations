import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { ServiceService } from './Service/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'project';
  allusers: any = [];
  id: any = [];
  filteredList: any = [];
  filterControl = new FormControl();
  constructor(public dialog: MatDialog, private service: ServiceService) {}

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
        this.service.postUser(result).subscribe((res) => this.getAllUser());
      } else if (action === 'edit' && result != null) {
        result.id = editData.id;
        this.service.updateUser(result).subscribe((res) => this.getAllUser());
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

  onDelete(id: number) {
    this.service.deleteData(id).subscribe({
      next: () => this.getAllUser(),
      error: () => alert('something Wrong'),
    });
  }
}
