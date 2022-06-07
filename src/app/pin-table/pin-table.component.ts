import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from '../api.service';

export interface InfoElement {
  name: string;
  description: string;
  rating: number;
  userName:number
}


/**
 * @title Table with sorting
 */
@Component({
  selector: 'pin-table',
  styleUrls: ['./pin-table.component.css'],
  templateUrl: './pin-table.component.html',
})
export class PinTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'rating', 'userName'];
  ELEMENT_DATA: InfoElement[] = []

  constructor(private _liveAnnouncer: LiveAnnouncer,
    private apiService:ApiService) {}
    dataSource:any
    ngOnInit(){
       this.apiService.getPinsInfo().subscribe(res=>{
         console.log(res)
         this.ELEMENT_DATA=res
         this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
         this.dataSource.sort = this.sort;
       })
   }

  @ViewChild(MatSort,{static: true}) sort: MatSort;

  // ngAfterViewInit() {
  //   this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  //   this.dataSource.sort = this.sort;
  // }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
