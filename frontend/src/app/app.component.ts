import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { CreateProjectComponent } from './project/create-project/create-project.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private dialog: MatDialog){

  }
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  title = 'construction';

  onCreate() {
    this.dialog.open(CreateProjectComponent);
  }
}
