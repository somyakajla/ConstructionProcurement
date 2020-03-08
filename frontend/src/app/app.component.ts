import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
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
  }
}
