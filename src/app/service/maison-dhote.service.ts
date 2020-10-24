import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Maison } from '../Models/Maison';

@Injectable({
  providedIn: 'root'
})
export class MaisonDhoteService {
   perf = "http://maisondhote.tn/backend/public/api/";
  constructor(private httpClient: HttpClient) { }
  getMaisonDhote() : Observable<any>
  {
   return this.httpClient.get(this.perf+"maisondhote");
  }
  getImageMaisonDhote() : Observable<any>
  {
   return this.httpClient.get(this.perf+"image");
  }
  saveImageMaisonDhote(maisondhote:Maison) : Observable<any>
  {
   return this.httpClient.post(this.perf+"addmaisondhote",maisondhote);
  }//Cros policy and add other attributes to Maison model 

}
