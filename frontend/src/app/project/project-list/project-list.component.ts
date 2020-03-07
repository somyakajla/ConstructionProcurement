import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ProjectDetailsComponent } from '../project-details/project-details.component'
import { ProjectService } from '../../shared/project.service'
import { Project } from '../../shared/project.model'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projectList: Observable<Project[]>;

  constructor(
    private dialog: MatDialog,
    public projectService: ProjectService,
    ) { }

  ngOnInit(): void {    
    this.userProjectList();
  }

  userProjectList() {
    // var item = JSON.parse(localStorage.getItem("currentUser"));
    //  //var a = this.projectService.getProjectList(item.email);
    //  //alert(a);
    //   this.projectService.getProjectList(item.email).subscribe(projects => {
    //   this.projectList = projects;
    //   alert(this.projectList[0].projectName)
    // });
    this.projectList = this.projectService.getProjectList('somya3@gmail.com');
  }

  projectDetails(a) {
    alert(a.Project);
    this.dialog.open(ProjectDetailsComponent);
  }
}
