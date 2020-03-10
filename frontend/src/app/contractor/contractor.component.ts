import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/project.model'
import { ProjectBid } from '../shared/project-bid.model'
import { ProjectService } from '../shared/project.service'
import { BidOnProjectComponent } from '../bid-on-project/bid-on-project.component';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { AuthenticateService} from '../shared/authenticate.service'
import { LoggedInUser } from '../shared/user.model';

@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.component.html',
  styleUrls: ['./contractor.component.scss']
})
export class ContractorComponent implements OnInit {
  currentUser: LoggedInUser;
  displayedOpenListColumns = ['projectName', 'projectStatus', 'startDate', 'endDate', 'ownerEmail', 'actions'];
  displayedBiddingListColumns = ['projectName', 'projectBiddingStatus', 'startDate', 'endDate', 'contractorEmail', 'progress'];
  projectOpenList: MatTableDataSource<Project>;
  projectBiddingList: MatTableDataSource<ProjectBid>;

  constructor(public projectService: ProjectService,
    private dialog: MatDialog,
    private router: Router,
    private authenticateService: AuthenticateService,
  ) { 
    this.authenticateService.currentUser.subscribe(x => this.currentUser = x);
      if(! this.currentUser) {
        this.router.navigate(['/login']);
  }
}

  ngOnInit(): void {
    this.userProjectBiddingList();
    this.getProjectOpenList();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.projectOpenList.filter = filterValue;
  }

  applyFilterOnBiddingList(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.projectBiddingList.filter = filterValue;
  }

  userProjectBiddingList() {
    var item = JSON.parse(localStorage.getItem("currentUser"));
    this.projectService.getProjectBiddingList(item.email).subscribe(ProjectBid => {
      this.projectBiddingList = new MatTableDataSource(ProjectBid);
    });
  }

  getProjectOpenList() {
    var item = JSON.parse(localStorage.getItem("currentUser"));
    this.projectService.getProjectOpenList().subscribe(projects => {
      this.projectOpenList = new MatTableDataSource(projects);
    });
  }

  bidOnProject(projectName) {
    localStorage.setItem('bidProjectName', projectName);
    this.dialog.open(BidOnProjectComponent);
  }

  addProgress(projectName) {
    localStorage.setItem('projectName', projectName);
    this.router.navigate(['/progressTimeline']);
  }

}
