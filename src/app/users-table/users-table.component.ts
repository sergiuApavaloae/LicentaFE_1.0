import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

export interface InfoElement {
  name: string;
  score: number;
  numberReports: number;
  numberFeedbacks:number
}


/**
 * @title Table with sorting
 */
@Component({
  selector: 'users-table',
  styleUrls: ['./users-table.component.css'],
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'scor', 'numberReports', 'numberFeedbacks'];
  ELEMENT_DATA: InfoElement[] = []

  constructor(private _liveAnnouncer: LiveAnnouncer,
    private apiService:ApiService,
    private router:Router) {}
    dataSource:any
    ngOnInit(){
       this.apiService.getUserInfo().subscribe(results=>{
         this.ELEMENT_DATA=results
         this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
         this.dataSource.sort = this.sort;
       })
   }
  @ViewChild(MatSort,{static: true}) sort: MatSort;
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  back(): void {
    this.router.navigateByUrl("home");
  }
}
