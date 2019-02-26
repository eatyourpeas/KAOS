import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WardService } from './../../services/ward.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ward-detail',
  templateUrl: './ward-detail.page.html',
  styleUrls: ['./ward-detail.page.scss'],
})
export class WardDetailPage implements OnInit {

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

  wards;

  constructor(public router: Router, public activatedRouter: ActivatedRoute, public wardService: WardService, public toastController: ToastController) {
    this.wardService.getData().subscribe(res=>{
      this.wards = res;
      let name = this.activatedRouter.snapshot.paramMap.get("uid")
      this.ward = this.wards.find(item=>{
        return item.ward_id == name;
      });
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
            fac = "logo-game-controller-b";
            break;
          default:
            fac = facility;
            break;
        }
        this.facilities.push(fac);
      }
    });
  }

  ngOnInit() {

  }

  pop(f){
    console.log("called here")
    this.toastController.create({
      message: "Key: " + f,
      duration: 3000
    }).then(toast=>{
      toast.present();
    })
  }



}
