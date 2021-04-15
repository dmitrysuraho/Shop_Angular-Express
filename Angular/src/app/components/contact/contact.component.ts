import {Component, OnInit} from '@angular/core';
import GeocoderResult = google.maps.GeocoderResult;
import GeocoderStatus = google.maps.GeocoderStatus;
import Geocoder = google.maps.Geocoder;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent implements OnInit {

  public lat: number;
  public lng: number;
  public zoom: number = 16;

  public ngOnInit(): void {
    this.getGeoLocation('Belarus, Borisov, Bulvar Grechko');
  }

  public getGeoLocation(address: string): void {
    const geocoder: Geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'address': address
    }, (results: GeocoderResult[], status: GeocoderStatus) => {
      if (status == google.maps.GeocoderStatus.OK) {
        this.lat = results[0].geometry.location.lat();
        this.lng = results[0].geometry.location.lng();
      } else {
        alert(`Error: ${results}, status: ${status}`);
      }
    });
  }
}
