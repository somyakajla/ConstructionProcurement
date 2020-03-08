import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project.service'
import { NgForm } from '@angular/forms';
import { Project } from '../shared/project.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
  providers : [ProjectService]
})
export class CreateProjectComponent implements OnInit {
  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(public projectService: ProjectService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    var f = this.fillCompleteForm(form.value);
    this.projectService.postProject(f).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 400);
        //this.router.navigate(['/company']);
        this.resetForm(form);
        window.close();
      
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

  

  fillCompleteForm(project : Project) {
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
    resetForm(form: NgForm) {
      this.projectService.selectedProject = {
        projectName: '',
        ownerEmail: '', 
        startDate:'',
        endDate:'',
        city: '',
        state: '',
        status: '',
        phoneNumber: '',
        contactName:'',
        budget:'',
      };
      
      form.resetForm();
      this.serverErrorMessages = '';
    }


}




