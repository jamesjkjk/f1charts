import { Injectable } from '@angular/core';
import { FetchService } from '../fetch.service';
import { CarData } from 'src/app/models/CarData';
import { Subject } from 'rxjs';
import { Driver } from 'src/app/models/Driver';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CarDataService {
  constructor(private fetchService: FetchService) { }

  private carData: CarData[] = []
  private carDataSubject = new Subject<CarData[]>()

  async fetchCarData(
    driver: Driver,
    sessionKey: number,
    startDate: string,
    endDate: string
  ): Promise<CarData[]> {
    let url = environment.apiUrl + '/api/car_data'
    if (!driver.driver_number) throw new Error("A driver has not been selected")
    else {
      url = url + `?driver_number=${driver.driver_number}`
    }

    if (!sessionKey) throw new Error("A session has not been selected")
    else {
      url = url + `&session_key=${sessionKey}`
    }

    if (!startDate) throw new Error("A Start Date has not been selected")
    else {
      url = url + `&date_start=${startDate}`
    }

    if (!endDate) throw new Error("A End Date has not been selected")
    else {
      url = url + `&date_end=${endDate}`
    }
    const carData: CarData[] = await this.fetchService.fetchData(url)
   
    return carData
  }

  getCarData() {
    return this.carData
  }

  getCarDataListener() {
    return this.carDataSubject.asObservable()
  }
}