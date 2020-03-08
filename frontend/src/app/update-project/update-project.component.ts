import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ProjectService } from '../shared/project.service'
import { Project } from '../shared/project.model';
import { Router } from '@angular/router';



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
    public projectService: ProjectService) { 
    this.project = JSON.parse(localStorage.getItem("updateProjectObject"));
    localStorage.removeItem('updateProjectObject');
  }

  ngOnInit(): void {
  }

  updateProject(form: NgForm) {
    var f = this.fillForm(form.value);
    this.projectService.updateProject(f).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 400);
      
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }     
    ); 
    this.gotoList();
  }
    fillForm(project: Project) {
      var item2 = JSON.parse(localStorage.getItem("currentUser"));
      return this.projectService.selectedProject = {
        projectName: project.projectName,
        ownerEmail:item2.email,
        startDate: project.startDate,
        endDate: project.endDate,
        city: project.city,
        state: project.state,
        status: '',
        phoneNumber: project.phoneNumber,
        contactName: project.contactName,
        budget:project.budget,
      };
    }

  onSubmit(form: NgForm) {
    alert('1');
    this.updateProject(form);    
  }
  gotoList() {
    this.router.navigate(['/company']);
  }

}
