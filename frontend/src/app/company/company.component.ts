import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/project.model'
import { ProjectService } from '../shared/project.service'
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectComponent } from '../create-project/create-project.component'
import { UpdateProjectComponent } from '../update-project/update-project.component';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import { AuthenticateService} from '../shared/authenticate.service'
import { LoggedInUser } from '../shared/user.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})

export class CompanyComponent implements OnInit {
  project: Project;
  currentUser: LoggedInUser;
  displayedColumns = ['projectName', 'projectStatus', 'startDate', 'endDate', 'actions'];
  dataSource: MatTableDataSource<Project>;

  constructor(public projectService: ProjectService,
    private dialog: MatDialog,
    private authenticateService: AuthenticateService,
    private router: Router) { 
      this.authenticateService.currentUser.subscribe(x => this.currentUser = x);
      if(! this.currentUser) {
        this.router.navigate(['/login']);
      }
    }

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
    let dialogRef = this.dialog.open(UpdateProjectComponent, {
      data: {
        projectName: name 
      }});
      dialogRef.afterClosed().subscribe(result => this.router.navigate(['/company']));
  }

  accept(projectName) {
    localStorage.setItem('projectName', projectName);
    this.router.navigate(['/acceptBid']);
  }
}