import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project.service'
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { ProjectBid } from '../shared/project-bid.model';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-bid-on-project',
  templateUrl: './bid-on-project.component.html',
  styleUrls: ['./bid-on-project.component.scss']
})
export class BidOnProjectComponent implements OnInit {
  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(public projectService: ProjectService,
    private dialogRef: MatDialogRef<BidOnProjectComponent>,) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    var f = this.fillCompleteForm(form.value);
    this.projectService.postBidProject(f).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
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

  fillCompleteForm(projectBid : ProjectBid) {
    var item1 = localStorage.getItem("bidProjectName");
    var item2 = JSON.parse(localStorage.getItem("currentUser"));
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

    close() {
      this.dialogRef.close();
      window.location.href = environment.apiFrontEndUrl+'/contractor';
    }
}
