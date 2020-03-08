import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project.service'
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { ProjectBid } from '../shared/project-bid.model';

@Component({
  selector: 'app-bid-on-project',
  templateUrl: './bid-on-project.component.html',
  styleUrls: ['./bid-on-project.component.scss']
})
export class BidOnProjectComponent implements OnInit {
  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(public projectService: ProjectService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    var f = this.fillCompleteForm(form.value);
    this.projectService.postBidProject(f).subscribe(
      res => {
        window.close();
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
      
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

  fillCompleteForm(projectBid : ProjectBid) {
    var item1 = localStorage.getItem("bidProjectName");
    var item2 = JSON.parse(localStorage.getItem("currentUser"));
    alert(item1);
    alert(item2.email);
    return this.projectService.selectedProjectBid = {
      projectName: item1,
      contractorEmail: item2.email, 
      startDate: projectBid.startDate,
      endDate: projectBid.endDate,
      city: projectBid.city,
      state: projectBid.state,
      bidStatus: '',
      phoneNumber: projectBid.phoneNumber,
      contractorName: projectBid.contractorName,
      budget:projectBid.budget,
    };
    

  }
    resetForm(form: NgForm) {
      this.projectService.selectedProjectBid = {
        projectName: '',
        contractorEmail: '', 
        startDate:'',
        endDate:'',
        city: '',
        state: '',
        bidStatus: '',
        phoneNumber: '',
        contractorName:'',
        budget:'',
      };
      
      form.resetForm();
      this.serverErrorMessages = '';
    }


}
