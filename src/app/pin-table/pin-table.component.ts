import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

export interface InfoElement {
  description: string;
  rating: number;
  userName:number;
  latitude:string;
  longitude:string;
}

@Component({
  selector: 'pin-table',
  styleUrls: ['./pin-table.component.css'],
  templateUrl: './pin-table.component.html',
})
export class PinTableComponent implements OnInit {
  displayedColumns: string[] = ['id','latitude','longitude','rating','average', 'userName'];
  ELEMENT_DATA: InfoElement[] = []

  constructor(private _liveAnnouncer: LiveAnnouncer,
    private apiService:ApiService,
    private router:Router) {}
    dataSource:any
    ngOnInit(){
       this.apiService.getPinsInfo().subscribe(res=>{
         this.ELEMENT_DATA=res
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
