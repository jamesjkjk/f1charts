import { Injectable } from '@angular/core';
import { FetchService } from '../fetch.service';
import { Session } from 'src/app/models/Session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
private sessions:Session[]=[]
  constructor(private fetchService: FetchService) {
  }

  async fetchSessions(meetingKey:number): Promise<Session[]> {
    let url = 'http://localhost:8080/api/sessions'

    if (!meetingKey) throw new Error("A meeting has not been selected")
    else {
      url = url + `?meeting_key=${meetingKey}`
    }
    const sessions:Session[] = await this.fetchService.fetchData(url)
    this.sessions = sessions
    return this.sessions
  }

  getSessions(){
    return this.sessions
  }
}
