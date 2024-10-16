import { Injectable } from '@angular/core';
import { Lap } from 'src/app/models/Lap';
import { FetchService } from '../fetch.service';
import { Subject } from 'rxjs';
import { Driver } from 'src/app/models/Driver';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LapService {

  constructor(private fetchService: FetchService) { }

  private laps: Lap[] = []
  private lapsSubject = new Subject<Lap[]>()

  async fetchLaps(sessionKey: number): Promise<Lap[]> {
    let url = environment.apiUrl + '/api/laps'

    if (!sessionKey) throw new Error("A session has not been selected")
    else {
      url = url + `?session_key=${sessionKey}`
    }
    const laps: Lap[] = await this.fetchService.fetchData(url)
    this.laps = laps.map(x => this.addDateEnd(x))
    this.lapsSubject.next(laps)
    return this.laps
  }

  addDateEnd(lapData: Lap): Lap {
    const { date_start, duration_sector_1, duration_sector_2, duration_sector_3 } = lapData;
    const totalDuration = duration_sector_1 + duration_sector_2 + duration_sector_3;

    const startDate = new Date(date_start);
    const endDate = new Date(startDate.getTime() + totalDuration * 1000);

    return {
      ...lapData,
      date_end: endDate.toISOString()
    };
  }

  getLapByDriverAndLap(driver:Driver,lapnumber:number):Lap | undefined{
      return this.laps.find(lap => lap.driver_number === driver.driver_number && lap.lap_number === lapnumber);
  }

  getSession() {
    return this.laps[0].session_key
  }

  getLaps() {
    return this.laps
  }

  getLapsListener() {
    return this.lapsSubject.asObservable()
  }
}
