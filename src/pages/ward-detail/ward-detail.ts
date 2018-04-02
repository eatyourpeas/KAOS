import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-ward-detail',
  templateUrl: 'ward-detail.html',
})
export class WardDetailPage {

  ward;
  ward_name;
  telephone;
  visiting_times;
  max_visitors;
  location;
  facilities = [];
  ward_manager;
  protected_mealtime;
  history;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.ward = this.navParams.get('ward');
    this.ward_name = this.ward.ward_name;
    this.telephone = this.ward.telephone;
    this.visiting_times = this.ward.visiting_times;
    this.max_visitors = this.ward.max_visitors;
    this.location = this.ward.location;
    //this.facilities = this.ward.facilities;
    this.ward_manager = this.ward.ward_manager;
    this.protected_mealtime = this.ward.protected_mealtime;
    this.history = this.ward.history;

    for(var facility of this.ward.facilities){
      let fac = facility;
      switch(fac){
        case "mobile":
          fac = "phone-portrait";
          break;
        case "entertainment":
          fac = "md-game-controller-b";
          break;
        default:
          fac = facility;
          break;
      }
      this.facilities.push(fac);
    }
  }

}
