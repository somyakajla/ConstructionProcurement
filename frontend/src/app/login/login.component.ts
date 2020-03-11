import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticateService } from '../shared/authenticate.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  loading = false;
  submitted = false;
  returnUrl: string;  
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(
    private formBuilder: FormBuilder,
    public authenticateService: AuthenticateService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
  }
  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticateService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
              if(this.authenticateService.currentUserValue.type === "owner")
                this.router.navigate(['/company']);
              else
                this.router.navigate(['/contractor']);
            },
            error => {
                this.loading = false;
            });
  }
}