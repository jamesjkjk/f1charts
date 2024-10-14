import { Injectable } from '@angular/core';
import { Lap } from 'src/app/models/Lap';
import { FetchService } from '../fetch.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LapService {

  constructor(private fetchService: FetchService) { }
  
  private laps: Lap[] = []
  private lapsSubject = new Subject<Lap[]>()

  async fetchLaps(sessionKey: number): Promise<Lap[]> {
    let url = 'http://localhost:8080/api/laps'

    if (!sessionKey) throw new Error("A session has not been selected")
    else {
      url = url + `?session_key=${sessionKey}`
    }
    const laps: Lap[] = await this.fetchService.fetchData(url)
    this.laps = laps
    this.lapsSubject.next(laps)
    return this.laps
  }

  getLaps() {
    return this.laps
  }

  getLapsListener() {
    return this.lapsSubject.asObservable()
  }
}
