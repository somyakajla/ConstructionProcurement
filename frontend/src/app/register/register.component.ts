import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  contactMethods = [
    { id: 1, label: "owner" },
    { id: 2, label: "contractor" }
]
  showSucessMessage: boolean;
  serverErrorMessages: string;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private dialogRef: MatDialogRef<RegisterComponent>,
    public userService: UserService,
    private router: Router,
    ) { 
      userService.selectedUser.userType = 'owner'
    }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
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

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      companyName: '',
      email: '', 
      passcode: '',
      userType: '',
      city: '',
      state: '',
      contactName: '',
      phoneNumber: ''
    };
    
    form.resetForm();
    this.serverErrorMessages = '';
  }
  close() {
    this.dialogRef.close();
  }

}
