import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConferenceData } from '../../providers/conference-data';
import { ActionSheetController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MaisonDhoteService } from '../../service/maison-dhote.service';

@Component({
  selector: 'page-speaker-detail',
  templateUrl: 'speaker-detail.html',
  styleUrls: ['./speaker-detail.scss'],
})
export class SpeakerDetailPage {
  speaker: any;
  dataMaisonDote: any;
  dataMaisonSelected: any;
  mapdetails: any;

  constructor(
    private dataProvider: ConferenceData,
    private route: ActivatedRoute,
    public actionSheetCtrl: ActionSheetController,
    public confData: ConferenceData,
    public inAppBrowser: InAppBrowser,
    private maisonDhoteService:MaisonDhoteService
  ) {
    
}
  

  ionViewWillEnter() {
  
      const speakerId = this.route.snapshot.paramMap.get('speakerId');
      this.getAllData(speakerId);
 
  }
  getAllData(id) {
    this.maisonDhoteService.getMaisonDhote().subscribe(res=>{
      this.dataMaisonDote = res.data;
      console.log(this.dataMaisonDote);
      this.maisonDhoteService.getImageMaisonDhote().subscribe(img=>{
        this.dataMaisonDote.forEach(element => {
          element['src'] =  img.data.filter(e=>e.id== element.image_id)
        });
        this.dataMaisonSelected=this.dataMaisonDote.filter(e=>e.id==id)[0]
      console.log(this.dataMaisonSelected);
      this.mapdetails = {lat:+this.dataMaisonSelected.mapurl.slice().split(" ")[0],lng:+this.dataMaisonSelected.mapurl.slice().split(" ")[1]}
      console.log( this.mapdetails);
      
      })
    })
  }

  openExternalUrl(url: string) {
    this.inAppBrowser.create(
      url,
      '_blank'
    );
  }

  async openSpeakerShare(speaker: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Share ' + speaker.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log(
              'Copy link clicked on https://twitter.com/' + speaker.twitter
            );
            if (
              (window as any).cordova &&
              (window as any).cordova.plugins.clipboard
            ) {
              (window as any).cordova.plugins.clipboard.copy(
                'https://twitter.com/' + speaker.twitter
              );
            }
          }
        },
        {
          text: 'Share via ...'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async openContact(speaker: any) {
    const mode = 'ios'; // this.config.get('mode');

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Contact ' + speaker.name,
      buttons: [
        {
          text: `Email ( ${speaker.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + speaker.email);
          }
        },
        {
          text: `Call ( ${speaker.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + speaker.phone);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }
}
