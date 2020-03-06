import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { IUser } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: IUser;
  userResponse: IUser;
  constructor(private userService: UserService) {
    this.user = {
      email: '',
      company_name: 'a',
      role: 'owner',
    };
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  // validate email address
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  async ngOnInit() { }

  async onSubmit() {
    console.log(this.user)
    this.userService.authenticateUser(this.user)
      .subscribe(user => this.userResponse = user);
    // turn off CORS before you do this
    console.log("response")
    console.log(this.userResponse)
  }

}
