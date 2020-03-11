import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AuthenticateService} from './shared/authenticate.service'
import { Router } from '@angular/router';
import { LoggedInUser } from './shared/user.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentUser: LoggedInUser;

  constructor(private dialog: MatDialog,
    private authenticateService: AuthenticateService,
    private router: Router){
      this.authenticateService.currentUser.subscribe(x => this.currentUser = x);
  }
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  title = 'construction';

  logout() {
    this.authenticateService.logout();
    this.router.navigate(['/login']);
}
}