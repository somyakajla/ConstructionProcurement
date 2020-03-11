import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project.service'
import { ProgressTimeline } from '../shared/progress-timeline.model'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-progress',
  templateUrl: './add-progress.component.html',
  styleUrls: ['./add-progress.component.scss']
})

export class AddProgressComponent implements OnInit {
  showSucessMessage: boolean;
  serverErrorMessages: string;
  /**
   * 
   * @param projectService Constructor of this class
   * @param router 
   */
  constructor(public projectService: ProjectService,
    private router: Router,
    private dialogRef: MatDialogRef<AddProgressComponent>,
  ) { 

  }
  /**
   * Init method of this class
   */
  ngOnInit(): void {
  }

  /**
   * onsbmit function to add the progress about project
   * @param form 
   */
  onSubmit(form: NgForm) {
    var f = this.fillCompleteForm(form.value);
    this.projectService.postProgressTimeline(f).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 400);
        this.close();
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
  }

  fillCompleteForm(progress: ProgressTimeline) {
    var d = new Date();
    var a = d.toLocaleString();       // -> "2/1/2013 7:37:08 AM"
    var curUser = JSON.parse(localStorage.getItem("currentUser"));
    var pName = localStorage.getItem("projectName");
    alert(progress.description)
    return this.projectService.selectedProgress = {
      projectName: pName,
      contractorEmail: curUser.email,
      description: progress.description,
      currentTime: a,
    };
  }

  close() {
    this.dialogRef.close();
  }

}