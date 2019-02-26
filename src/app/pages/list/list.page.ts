import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  items: Array<{title: string, note: string, icon: string, page_name: string}>;
  selectedItem: any;
  icons: string[];

  constructor(private router: Router) {
      this.items = [{title: 'The Hospital', note: 'Getting around', icon: 'business', page_name: '/hospital'},
      {title: 'The Wards', note: "About each ward", icon: "locate", page_name: 'wards'},
      {title: 'Who Can Visit?', note: "Visiting times", icon: "clock", page_name: 'visiting-times'},
      {title: 'Medical Questions', note: "Who can I talk to about my condition?", icon: "medkit", page_name: 'medical-questions'},
      {title: 'Entertainment', note: "What is there to do?", icon: "logo-game-controller-b", page_name: '/entertainment'},
      {title: 'Consent & Confidentiality', note: "What are my rights?", icon: "hand", page_name: '/consent'},
      {title: 'Privacy and Security', note: "What happens to my information?", icon: "lock", page_name: 'privacy'},
      {title: 'Internet Access', note: "How do I get a wifi code?", icon: "wifi", page_name: '/internet'},
      {title: 'Gender & Sexuality', note: "Who can I ask if I have questions?", icon: "transgender", page_name: '/gender'},
      {title: 'Smoking, Drugs & Alcohol', note: "My health, smoking, drugs and alcohol", icon: "wine", page_name: '/drugs'},
  //    {title: 'Gangs', note: "About gangs and safety", icon: "people", page_name: 'GangsPage'},
      {title: 'Legal', note: "My rights, responsibilities and the Law", icon: "ribbon", page_name: '/legal'},
      {title: 'School & Education', note: "Hospital and my studies", icon: "school", page_name: '/schools'},
    //  {title: 'Shops', note: "Where can I get things I need?", icon: "cart", page_name: 'ShopsPage'},
      {title: 'Driving', note: "Implications for driving", icon: "car", page_name: '/driving'},
  //    {title: 'Nutrition', note: "Menus and nutrition advice", icon: "nutrition", page_name: 'NutritionPage'},
  //    {title: 'Religion', note: "About my faith", icon: "bookmarks", page_name: 'ReligionPage'},
  //    {title: 'Ethnic & Cultural Diversity', note: "My ethnicity and KCH", icon: "globe", page_name: 'EthnicityPage'},
      {title: 'Complaints', note: "Who do I talk to if I have not been treated fairly?", icon: "alert", page_name: '/complaints'}
    ];
  }

  ngOnInit() {
  }

  itemTapped(event, item) {
    this.router.navigate(item.page_name);
  }



}
