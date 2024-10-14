import { Component, Input, OnInit } from '@angular/core';
import { Driver } from 'src/app/models/Driver';
import { f1DriverCountryCodes } from "src/app/constants"
@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  @Input() driver: Driver | undefined;

  constructor() { }

  ngOnInit() {
  }

  getCorrectCountryCode(code:string){
    return f1DriverCountryCodes[code].toLowerCase()
  }
}
