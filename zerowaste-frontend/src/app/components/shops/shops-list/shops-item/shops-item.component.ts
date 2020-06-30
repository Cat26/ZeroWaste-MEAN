import {Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shops-item',
  templateUrl: './shops-item.component.html',
  styleUrls: ['./shops-item.component.css']
})
export class ShopsItemComponent implements OnInit {

  zoom = 15
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: true,
    streetViewControl: false,
    panControl: false,
    mapTypeControl: false,
    disableDoubleClickZoom: true,
    maxZoom: 18,
    minZoom: 8,
  }

  @Input() shopItem: {
    name: string,
    email: string,
    phoneNumber: string,
    shopAddress: string,
    description: string,
    rating: number,
    enabled: boolean,
    _id: string
  }

  constructor(
  ) { }
  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }


}
