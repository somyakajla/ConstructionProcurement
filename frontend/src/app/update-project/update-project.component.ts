import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ProjectService } from '../shared/project.service'
import { Project } from '../shared/project.model';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss']
})
export class UpdateProjectComponent implements OnInit {
  showSucessMessage: boolean;
  serverErrorMessages: string;
  project: Project;

  constructor(private router: Router,
    public projectService: ProjectService,
    private dialogRef: MatDialogRef<UpdateProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
    //alert(this.data.projectName);
    this.projectService.getProject(this.data.projectName).subscribe(data => {
      this.project = data;
    });

  }

  updateProject(form: NgForm) {
    var f = this.fillForm(form.value);
    this.projectService.updateProject(f, this.data.projectName).subscribe(
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

  fillForm(project: Project) {
    var item2 = JSON.parse(localStorage.getItem("currentUser"));
    return this.projectService.selectedProject = {
      projectName: this.data.projectName,
      ownerEmail: item2.email,
      startDate: project.startDate,
      endDate: project.endDate,
      city: project.city,
      state: project.state,
      status: '',
      phoneNumber: project.phoneNumber,
      contactName: project.contactName,
      budget: project.budget,
    };
  }

  onSubmit(form: NgForm) {
    this.updateProject(form);
  }

  close() {
    this.dialogRef.close();
  }

}