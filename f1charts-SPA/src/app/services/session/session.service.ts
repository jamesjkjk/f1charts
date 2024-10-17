import { Injectable } from '@angular/core';
import { FetchService } from '../fetch.service';
import { Session } from 'src/app/models/Session';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
private sessions:Session[]=[]
  constructor(private fetchService: FetchService) {
  }

  async fetchSessions(meetingKey:number): Promise<Session[]> {
    let url = environment.apiUrl + '/api/sessions'

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
