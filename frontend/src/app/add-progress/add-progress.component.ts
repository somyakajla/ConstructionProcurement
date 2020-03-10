import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project.service'
import {ProgressTimeline} from '../shared/progress-timeline.model'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-progress',
  templateUrl: './add-progress.component.html',
  styleUrls: ['./add-progress.component.scss']
})
export class AddProgressComponent implements OnInit {
  showSucessMessage: boolean;
  serverErrorMessages: string;
  constructor(public projectService: ProjectService,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    var f = this.fillCompleteForm(form.value);
    this.projectService.postProgressTimeline(f).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 400);
        this.router.navigate(['/progressTimeline']);
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

  fillCompleteForm(progress : ProgressTimeline) {
    // var date = new Date();
    // let latest_date =this.datepipe.transform(date, 'yyyy-MM-dd');
    var d = new Date();
    var a = d.toLocaleString();       // -> "2/1/2013 7:37:08 AM"
    //d.toLocaleDateString(); 
    var curUser = JSON.parse(localStorage.getItem("currentUser"));
    var pName = localStorage.getItem("projectName");
    alert(progress.description)
    return this.projectService.selectedProgress = {
      projectName: pName,
      contractorEmail: curUser.email,
      description: progress.description,
      currentTime: a//latest_date,
    };
  }

}
