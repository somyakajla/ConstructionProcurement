import { Component, OnInit } from '@angular/core';
import { ProgressTimeline } from '../shared/progress-timeline.model'
import { ProjectService } from '../shared/project.service'
import { AddProgressComponent } from '../add-progress/add-progress.component'
import { MatDialog } from "@angular/material/dialog";
import { LoggedInUser } from '../shared/user.model';
import { AuthenticateService } from '../shared/authenticate.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-progress-timeline',
  templateUrl: './progress-timeline.component.html',
  styleUrls: ['./progress-timeline.component.scss']
})
export class ProgressTimelineComponent implements OnInit {
  progressList: ProgressTimeline[];
  currentUser: LoggedInUser;
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  constructor(public projectService: ProjectService, 
    private dialog: MatDialog,
    private authenticateService: AuthenticateService,
    private router: Router) {
    this.authenticateService.currentUser.subscribe(x => this.currentUser = x);
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }
    this.getProgressList();
  }

  addProgress() {
    this.dialog.open(AddProgressComponent);
  }

  getProgressList() {
    var item = localStorage.getItem("projectName");
    this.projectService.getProgressTimelineList(item).subscribe(progressList => {
      this.progressList = progressList;
    });
  }
}