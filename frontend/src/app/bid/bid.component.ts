import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { BidOnProjectComponent } from '../bid-on-project/bid-on-project.component';
@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.scss']
})
export class BidComponent implements OnInit {

  List: any


  constructor(private dialog: MatDialog) { 
    this.List=[
      {
        "Project":"BuildOffice",
        "Status":"Open",
        "Owner":"Somya"
      },
      {
        "Project":"Renovate",
        "Status":"Accepted",
        "Owner":"SomyaKajla"
      },
      {
        "Project":"ConstructSchool",
        "Status":"Denied",
        "Owner":"Somya"
      },

    ]
  }

  ngOnInit(): void {
  }
  bidOnProject() {
    this.dialog.open(BidOnProjectComponent);
  }

}
