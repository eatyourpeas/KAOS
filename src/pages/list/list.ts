import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string, page_name: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.selectedItem = navParams.get('item');

    this.items = [{title: 'The Hospital', note: 'Getting around', icon: 'map', page_name: 'HospitalPage'},
    {title: 'The Wards', note: "About each ward", icon: "locate", page_name: 'WardsPage'},
    {title: 'Who Can Visit?', note: "Visiting times", icon: "clock", page_name: 'VisitingTimesPage'},
    {title: 'Medical Questions', note: "Who can I talk to about my condition?", icon: "medkit", page_name: 'MedicalQuestionsPage'},
    {title: 'Entertainment', note: "What is there to do?", icon: "game-controller-b", page_name: 'EntertainmentPage'},
    {title: 'Consent & Confidentiality', note: "What are my rights?", icon: "hand", page_name: 'ConsentPage'},
    {title: 'Privacy and Security', note: "What happens to my information?", icon: "lock", page_name: 'PrivacyPage'},
    {title: 'Internet Access', note: "How do I get a wifi code?", icon: "wifi", page_name: 'InternetPage'},
    {title: 'Gender & Sexuality', note: "Who can I ask if I have questions?", icon: "transgender", page_name: 'GenderPage'},
    {title: 'Smoking, Drugs & Alcohol', note: "My health, smoking, drugs and alcohol", icon: "wine", page_name: 'DrugsPage'},
    {title: 'Gangs', note: "About gangs and safety", icon: "people", page_name: 'GangsPage'},
    {title: 'Legal', note: "My rights, responsibilities and the Law", icon: "ribbon", page_name: 'LegalPage'},
    {title: 'School & Education', note: "Hospital and my studies", icon: "school", page_name: 'SchoolsPage'},
    {title: 'Shops', note: "Where can I get things I need?", icon: "cart", page_name: 'ShopsPage'},
    {title: 'Driving', note: "Implications for driving", icon: "car", page_name: 'DrivingPage'},
    {title: 'Nutrition', note: "Menus and nutrition advice", icon: "nutrition", page_name: 'NutritionPage'},
    {title: 'Religion', note: "About my faith", icon: "bookmarks", page_name: 'ReligionPage'},
    {title: 'Ethnic & Cultural Diversity', note: "My ethnicity and KCH", icon: "globe", page_name: 'EthnicityPage'},
    {title: 'Complaints', note: "Who do I talk to if I have not been treated fairly?", icon: "alert", page_name: 'ComplaintsPage'}
  ];

  }

  itemTapped(event, item) {
    this.navCtrl.push(item.page_name);
  }
}
