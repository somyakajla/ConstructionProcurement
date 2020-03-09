import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/project.model'
import { ProjectBid } from '../shared/project-bid.model'
import { ProjectService } from '../shared/project.service'
import { BidOnProjectComponent } from '../bid-on-project/bid-on-project.component';

import { MatDialog } from "@angular/material/dialog";
@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.component.html',
  styleUrls: ['./contractor.component.scss']
})
export class ContractorComponent implements OnInit {
  projectOpenList: Project[] = [];
  projectBiddingList: ProjectBid[] = [];

  constructor(public projectService: ProjectService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userProjectBiddingList();
    this.getProjectOpenList();
  }

  userProjectBiddingList() {
    var item = JSON.parse(localStorage.getItem("currentUser"));
    this.projectService.getProjectBiddingList(item.email).subscribe(projects => {
      this.projectBiddingList = projects
    });
  }

  getProjectOpenList() {
    var item = JSON.parse(localStorage.getItem("currentUser"));
    this.projectService.getProjectOpenList().subscribe(projects => {
      this.projectOpenList = projects
    });
  }

  bidOnProject(projectName) {
    localStorage.setItem('bidProjectName', projectName);
    this.dialog.open(BidOnProjectComponent);
  }

  addProgress(projectName) {
    localStorage.setItem('bidProjectName', projectName);
   // this.dialog.open(ProgressDetailsComponent);
    
  }

}
