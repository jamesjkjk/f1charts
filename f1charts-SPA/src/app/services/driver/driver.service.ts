import { Injectable } from '@angular/core';
import { Driver } from 'src/app/models/Driver';
import { FetchService } from '../fetch.service';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private drivers: Driver[] = []
  private driversSubject = new Subject<Driver[]>()
  constructor(private fetchService: FetchService) { }

  async fetchDrivers(sessionKey: number): Promise<Driver[]> {
    let url = environment.apiUrl + '/api/drivers'

    if (!sessionKey) throw new Error("A session has not been selected")
    else {
      url = url + `?session_key=${sessionKey}`
    }
    const drivers: Driver[] = await this.fetchService.fetchData(url)

    this.drivers = this.selectAllDrivers(drivers)
    this.driversSubject.next(this.drivers)
    return this.drivers
  }

  selectAllDrivers(drivers:Driver[]){
    return drivers.map(driver => ({
      ...driver,
      is_selected: true
    }));
  }

  selectDriverByNumber(driverNumber: number): void {
    this.drivers = this.drivers.map(driver => ({
      ...driver,
      is_selected: driver.driver_number === driverNumber ? !driver.is_selected : driver.is_selected
    }));
    this.driversSubject.next(this.drivers);
  }

  selectDriverByLastName(lastName: string): void {
    this.drivers = this.drivers.map(driver => ({
      ...driver,
      is_selected: driver.last_name == lastName ? !driver.is_selected : driver.is_selected
    }));
    this.driversSubject.next(this.drivers);
  }

  getDrivers() {
    return this.drivers
  }

  getDriversListener() {
    return this.driversSubject.asObservable()
  }

  getDriverByNumber(driverNumber: number): Driver | undefined {
    return this.drivers.find(d => d.driver_number === driverNumber);
  }

  getDriverByLastName(lastName: string): Driver | undefined {
    return this.drivers.find(d => d.last_name === lastName);
  }
}
