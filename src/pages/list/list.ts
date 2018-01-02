import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [{title: 'The Hospital', note: 'Getting around', icon: 'map'},
    {title: 'The Wards', note: "About each ward", icon: "locate"},
    {title: 'Who Can Visit?', note: "Visiting times", icon: "clock"},
    {title: 'Medical Questions', note: "Who can I talk to about my condition?", icon: "medkit"},
    {title: 'Entertainment', note: "What is there to do?", icon: "game-controller-b"},
    {title: 'Consent & Confidentiality', note: "What are my rights?", icon: "hand"},
    {title: 'Privacy and Security', note: "What happens to my information?", icon: "lock"},
    {title: 'Internet Access', note: "How do I get a wifi code?", icon: "wifi"},
    {title: 'Gender & Sexuality', note: "Who can I ask if I have questions?", icon: "transgender"},
    {title: 'Smoking, Drugs & Alcohol', note: "My health, smoking, drugs and alcohol", icon: "wine"},
    {title: 'Gangs', note: "About gangs and safety", icon: "people"},
    {title: 'Legal', note: "My rights, responsibilities and the Law", icon: "ribbon"},
    {title: 'School & Education', note: "Hospital and my studies", icon: "school"},
    {title: 'Shops', note: "Where can I get things I need?", icon: "cart"},
    {title: 'Driving', note: "Implications for driving", icon: "car"},
    {title: 'Nutrition', note: "Menus and nutrition advice", icon: "nutrition"},
    {title: 'Religion', note: "About my faith", icon: "bookmarks"},
    {title: 'Ethnic & Cultural Diversity', note: "My ethnicity and KCH", icon: "globe"},
    {title: 'Complaints', note: "Who do I talk to if I have not been treated fairly?", icon: "alert"}
  ];
    /*
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
    */
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
