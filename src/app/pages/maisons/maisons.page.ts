import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Maison } from '../../Models/Maison';
import { ConferenceData } from '../../providers/conference-data';
import { darkStyle } from './map-dark-style';

@Component({
  selector: 'app-maisons',
  templateUrl: './maisons.page.html',
  styleUrls: ['./maisons.page.scss'],
})
export class MaisonsPage {
  maisons = [{...new Maison(),nom:"maison",imageId:"1",mapUrl:"33.8086848,10.8475377",description:"desciption2"},
  {...new Maison(),nom:"maison3",imageId:"1",mapUrl:"33.8295245,10.8165099",description:"desciption3"},
  {...new Maison(),nom:"maison4",imageId:"1",mapUrl:"33.8026761,10.8860757",description:"desciption4"}] 

  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    public confData: ConferenceData,
    public platform: Platform) {}
 

  async ngAfterViewInit() {
    const appEl = this.doc.querySelector('ion-app');
    let isDark = false;
    let style = [];
    if (appEl.classList.contains('dark-theme')) {
      style = darkStyle;
    }

    const googleMaps = await getGoogleMaps(
      'AIzaSyB8pf6ZdFQj5qw7rc_HSGrhUwQKfIe9ICw'
    );

    let map;

    this.confData.getMap().subscribe((mapData: any) => {
      const mapEle = this.mapElement.nativeElement;

      map = new googleMaps.Map(mapEle, {
        center: { lat: 33.817983, lng: 10.9156712 },
        zoom: 11,
        styles: style,
        
      });

      mapData.forEach((markerData: any) => {
        const infoWindow = new googleMaps.InfoWindow({
          content: `<h5>${markerData.name}</h5>`
          
        });
        this.maisons.forEach((maison) => {
          console.log(maison);
          let mapUrl = maison.mapUrl.split(',');
          let lat=+mapUrl[0];
          let long=+mapUrl[1];
          console.log(lat+" "+long);
          const marker = new googleMaps.Marker({
            position: { lat: lat, lng: long },
            map,
            title:"hello"
          });
          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
          
        });
   
      });

      googleMaps.event.addListenerOnce(map, 'idle', () => {
        mapEle.classList.add('show-map');
      });
    });

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const el = mutation.target as HTMLElement;
          isDark = el.classList.contains('dark-theme');
          if (map && isDark) {
            map.setOptions({styles: darkStyle});
          } else if (map) {
            map.setOptions({styles: []});
          }
        }
      });
    });
    observer.observe(appEl, {
      attributes: true
    });
  }
}

function getGoogleMaps(apiKey: string): Promise<any> {
  const win = window as any;
  const googleModule = win.google;
  if (googleModule && googleModule.maps) {
    return Promise.resolve(googleModule.maps);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.31`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      const googleModule2 = win.google;
      if (googleModule2 && googleModule2.maps) {
        resolve(googleModule2.maps);
      } else {
        reject('google maps not available');
      }
    };
  });

}
