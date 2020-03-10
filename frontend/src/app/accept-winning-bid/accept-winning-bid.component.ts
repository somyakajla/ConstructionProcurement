import { Component, OnInit } from '@angular/core';
import { AcceptBidService } from '../shared/accept-bid.service'
import { ProjectBid } from '../shared/project-bid.model'
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-accept-winning-bid',
  templateUrl: './accept-winning-bid.component.html',
  styleUrls: ['./accept-winning-bid.component.scss']
})
export class AcceptWinningBidComponent implements OnInit {
  //projectBids: ProjectBid[] = [];
  displayedColumns = ['projectName', 'contractorEmail', 'contractorName', 'startDate', 'endDate', 'budget', 'bidStatus', 'actions'];
  dataSource: MatTableDataSource<ProjectBid>;

  constructor(public acceptBidService: AcceptBidService) { }

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
      //this.projectBids = projectBids
    });
    
  }


  bidDetails(name) {
    // var pr: Project;
    // this.acceptBidService.getProject(name).subscribe(data => {
    //     pr = data;
    //     localStorage.setItem('updateProjectObject', JSON.stringify(data));
    // });

    // this.dialog.open(UpdateProjectComponent);
  }

  // bid accept service class
  acceptBid(projectName, email) {
    this.acceptBidService.acceptBid(projectName, email).subscribe(projectBids => {
      this.ngOnInit();
    });





  }
}
