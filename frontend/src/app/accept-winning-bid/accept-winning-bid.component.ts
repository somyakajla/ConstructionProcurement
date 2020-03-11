import { Component, OnInit } from '@angular/core';
import { AcceptBidService } from '../shared/accept-bid.service'
import { ProjectBid } from '../shared/project-bid.model'
import { MatTableDataSource } from '@angular/material/table';
import { LoggedInUser } from '../shared/user.model';
import { AuthenticateService } from '../shared/authenticate.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-accept-winning-bid',
  templateUrl: './accept-winning-bid.component.html',
  styleUrls: ['./accept-winning-bid.component.scss']
})
export class AcceptWinningBidComponent implements OnInit {
  currentUser: LoggedInUser;
  displayedColumns = ['projectName', 'contractorEmail', 'contractorName', 'startDate', 'endDate', 'budget', 'bidStatus', 'actions'];
  dataSource: MatTableDataSource<ProjectBid>;

  constructor(public acceptBidService: AcceptBidService,
    private authenticateService: AuthenticateService,
    private router: Router) { 
    this.authenticateService.currentUser.subscribe(x => this.currentUser = x);
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }
    
  }

  ngOnInit(): void {
    this.projectBidList();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  projectBidList() {
    var projectName = localStorage.getItem("projectName");
    this.acceptBidService.getProjectBidList(projectName).subscribe(projectBids => {
      this.dataSource = new MatTableDataSource(projectBids);
    });
  }

  bidDetails(name) {
  }

  // bid accept service class
  acceptBid(projectName, email) {
    this.acceptBidService.acceptBid(projectName, email).subscribe(projectBids => {
      this.ngOnInit();
    });
  }

}