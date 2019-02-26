import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WardService {

  constructor(public http: HttpClient) { }

  getData() {
    return this.http.get('assets/data/ward_data.json');
  }
}
