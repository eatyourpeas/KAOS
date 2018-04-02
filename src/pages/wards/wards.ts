import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WardsProvider } from '../../providers/wards/wards';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-wards',
  templateUrl: 'wards.html',
})
export class WardsPage {

  ward_data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public wardsProvider: WardsProvider, public http: HttpClient) {
    this.wardsProvider.getData().subscribe(data => {
               this.ward_data = data;
  });


}

itemTapped(event, item) {

  this.navCtrl.push('WardDetailPage', {
    ward: item
  });


}

  ionViewDidLoad() {

  }

}
