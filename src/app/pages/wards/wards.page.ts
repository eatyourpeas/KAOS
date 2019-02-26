import { Component, OnInit } from '@angular/core';
import { WardService } from './../../services/ward.service';

@Component({
  selector: 'app-wards',
  templateUrl: './wards.page.html',
  styleUrls: ['./wards.page.scss'],
})
export class WardsPage implements OnInit {

  ward_data;

  constructor(public wardService: WardService) {
  //   this.wardService.getData().subscribe(data => {
  //              this.ward_data = data;
  // });
    this.wardService.getData().subscribe(res=>{
      this.ward_data = res;
    })
  }

  ngOnInit() {
  }

}
