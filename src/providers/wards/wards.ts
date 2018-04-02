import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the WardsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WardsProvider {

  constructor(public http: HttpClient) {
    
  }

  getData() {
    return this.http.get('assets/data/ward_data.json');
  }

}
