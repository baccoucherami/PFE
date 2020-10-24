import { Component, ElementRef, Inject, ViewChild, AfterViewInit, Input } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { Platform } from '@ionic/angular';
import { DOCUMENT} from '@angular/common';

import { darkStyle } from './maps-dark-style';

@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
  styleUrls: ['./maps.scss']
})
export class MapsPage implements AfterViewInit {
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;
@Input() latLong : any;

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
if(this.latLong)
{
  map = new googleMaps.Map(mapEle, {
    center: { lat: 33.817983, lng: 10.9156712 }, //however should be changed to latLong object
    zoom: 11,
    styles: style,
  });
}
else{
      map = new googleMaps.Map(mapEle, {
        center: { lat: 33.817983, lng: 10.9156712 },
        zoom: 11,
        styles: style,
        
      });
    }

      mapData.forEach((markerData: any) => {
        const infoWindow = new googleMaps.InfoWindow({
          content: `<h5>${markerData.name}</h5>`
          
        });
if(this.latLong)
{
        const marker = new googleMaps.Marker({
          position: { lat: this.latLong.lat, lng: this.latLong.lng },
          map,
          title: "hello"
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      }
      else{
        const marker = new googleMaps.Marker({
          position: { lat: 33.817983, lng: 10.9156712 },
          map,
          title: "hello"
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

      }
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

