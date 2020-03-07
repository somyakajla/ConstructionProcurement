import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../shared/user.service'
import { AuthenticateService } from '../shared/authenticate.service'
import { User } from '../shared/user.model';



@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})

export class CompanyComponent implements OnInit {
  loading = false;
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getAll().pipe(first()).subscribe(users => {
        this.loading = false;
        this.users = users;
    });
  }
}
