import { Component } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { MaisonDhoteService } from '../../service/maison-dhote.service';

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html',
  styleUrls: ['./speaker-list.scss'],
})
export class SpeakerListPage  {
  speakers: any[] = [];
  dataMaisonDote: any;
  allImage: any;
  isReserve:boolean = false;
  constructor(public confData: ConferenceData, private maisonDhoteService:MaisonDhoteService) {
     this.getAllData();

  }
  reserver(data)
  {
    if(data['isReserve'])
    data['isReserve'] = false;
    else
    data['isReserve'] = true;
  }
  getAllData() {
    this.maisonDhoteService.getMaisonDhote().subscribe(res=>{
      this.dataMaisonDote = res.data;
      console.log(this.dataMaisonDote);
      this.maisonDhoteService.getImageMaisonDhote().subscribe(img=>{
        this.dataMaisonDote.forEach(element => {
          element['isReserve'] = false;
          element['src'] =  img.data.filter(e=>e.id== element.image_id)
        });
 
      console.log(this.dataMaisonDote);
      
      })
    })
  }

  ionViewDidEnter() {
    this.confData.getSpeakers().subscribe((speakers: any[]) => {
      this.speakers = speakers;
    });
  }
}
