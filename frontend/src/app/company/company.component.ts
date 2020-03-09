import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/project.model'
import { ProjectService } from '../shared/project.service'
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectComponent } from '../create-project/create-project.component'
import { UpdateProjectComponent } from '../update-project/update-project.component';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {DataSource} from '@angular/cdk/collections';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})

export class CompanyComponent implements OnInit {
  project: Project;
  displayedColumns = ['projectName', 'projectStatus', 'startDate', 'endDate', 'actions'];
  dataSource: MatTableDataSource<Project>;

  constructor(public projectService: ProjectService,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.userProjectList();
  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  userProjectList() {
    var item = JSON.parse(localStorage.getItem("currentUser"));
    this.projectService.getProjectList(item.email).subscribe(projects => {
      this.dataSource = new MatTableDataSource(projects);
    });
  }

  delete(projectName) {
    this.projectService.deleteProject(projectName)
      .subscribe(
        data => {
          console.log(data);
          this.userProjectList();
        },
        error => console.log(error));
  }

  addProject() {
    this.dialog.open(CreateProjectComponent);
  }

  update(name) {
    //localStorage.setItem('projectName', name);
    //alert(name);
    var pr: Project;
    this.projectService.getProject(name).subscribe(data => {
        pr = data;
        localStorage.setItem('updateProjectObject', JSON.stringify(data));
    });

    this.dialog.open(UpdateProjectComponent);
  }

  accept(projectName) {
    localStorage.setItem('projectName', projectName);
    this.router.navigate(['/acceptBid']);
  }
}