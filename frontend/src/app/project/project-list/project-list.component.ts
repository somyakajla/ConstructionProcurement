import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ProjectDetailsComponent } from '../project-details/project-details.component'
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projectList: any


  constructor(private dialog: MatDialog) { 
    this.projectList=[
      {
        "Project":"BuildOffice",
        "Status":"Open",
        "Owner":"Somya"
      },
      {
        "Project":"Renovate",
        "Status":"Open",
        "Owner":"SomyaKajla"
      },
      {
        "Project":"ConstructSchool",
        "Status":"Closed",
        "Owner":"Somya"
      },

    ]
  }

  ngOnInit(): void {
  }
  projectDetails(a) {
    alert(a.Project);
    this.dialog.open(ProjectDetailsComponent);
  }

}
