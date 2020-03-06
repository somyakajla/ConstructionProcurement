import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project.service'
import { NgForm } from '@angular/forms';
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
    alert("submiting the form.");
    document.forms['certform'].submit();
    window.close();
    // this.projectService.postProject(form.value).subscribe(
    //   res => {
    //     this.showSucessMessage = true;
    //     setTimeout(() => this.showSucessMessage = false, 4000);
    //   },
    //   err => {
    //     if (err.status === 422) {
    //       // validation error
    //       this.serverErrorMessages = err.error.join('<br/>');
    //     }
    //     else{
    //       // server connection error
    //       this.serverErrorMessages = 'Something went wrong.Please contact admin.';
    //     }
         
    //   }
    // );
  }


}
