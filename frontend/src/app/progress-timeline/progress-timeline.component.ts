import { Component, OnInit } from '@angular/core';
import {ProgressTimeline} from '../shared/progress-timeline.model'
import { ProjectService } from '../shared/project.service'
import {AddProgressComponent} from '../add-progress/add-progress.component'
import { MatDialog } from "@angular/material/dialog";


@Component({
  selector: 'app-progress-timeline',
  templateUrl: './progress-timeline.component.html',
  styleUrls: ['./progress-timeline.component.scss']
})
export class ProgressTimelineComponent implements OnInit {
  progressList: ProgressTimeline[];
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
 
  constructor(public projectService: ProjectService, private dialog: MatDialog) { 
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
 

