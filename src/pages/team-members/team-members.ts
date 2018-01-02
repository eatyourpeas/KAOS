import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';


/**
 * Generated class for the TeamMembersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team-members',
  templateUrl: 'team-members.html',
})
export class TeamMembersPage {

  team_members: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: DataProvider) {

  }

  ionViewDidLoad() {


    this.dataService.load().then((data) => {

        data.map((team_member) => {
            return team_member;
        });

        this.team_members = data;

    });

  }

}
