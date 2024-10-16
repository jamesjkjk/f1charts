import { LapService } from './../../services/lap/lap.service';
import { DriverService } from './../../services/driver/driver.service';
import { SessionService } from './../../services/session/session.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Meeting } from 'src/app/models/Meeting';
import { Session } from 'src/app/models/Session';
import { MeetingService } from 'src/app/services/meeting/meeting.service';

@Component({
  selector: 'app-session-selector',
  templateUrl: './session-selector.component.html',
  styleUrls: ['./session-selector.component.css']
})
export class SessionSelectorComponent implements OnInit {
  protected meetings: Meeting[] = [];
  protected filteredMeetings: any[] = [];
  protected years: number[] = [];
  protected countries: string[] = [];
  protected sessions:Session[]=[];

  filterForm: FormGroup;
  constructor(
    private meetingService: MeetingService,
    private sessionService:SessionService,
    private driverService:DriverService,
    private lapService:LapService
  ) {
    this.filterForm = new FormGroup({
      year: new FormControl(null),
      location: new FormControl(null),
      meeting: new FormControl(null),
      session:new FormControl(null)
    });
   }

  async ngOnInit() {
    this.setupFormValueChanges();
      this.years = this.meetingService.getYears();
      this.filterForm.get("year")?.patchValue(this.meetingService.getSelectedYear())
      await this.fetchCountries(this.years[0]);
  }
  
  setupFormValueChanges(): void {
    this.filterForm.get('year')?.valueChanges.subscribe(() => {
      this.filterForm.get('location')?.reset();
      this.filterForm.get('meeting')?.reset();
      this.filterForm.get('session')?.reset();
    });

    this.filterForm.get('location')?.valueChanges.subscribe(() => {
      this.filterForm.get('meeting')?.reset();
      this.filterForm.get('session')?.reset();
    });

    this.filterForm.get('meeting')?.valueChanges.subscribe(() => {
      this.filterForm.get('session')?.reset();
    });
  }

  async onYearSelected(event: MatSelectChange) {
    await this.fetchCountries(event.value);
  }

  async onCountrySelected(event: MatSelectChange) {
    await this.fetchMeetings(event.value);
  }
  
  async onMeetingSelected (event: MatSelectChange){
    await this.fetchSessions(event.value)
  }

  async onSessionSelected (event: MatSelectChange){
    this.driverService.fetchDrivers(event.value)
    this.lapService.fetchLaps(event.value)
  }

  async fetchCountries(year:number){
    this.meetingService.setSelectedYear(year)
    this.countries = await this.meetingService.fetchCountries()
  }

  async fetchMeetings(country:string){
    this.meetingService.setSelectedCountry(country)
    this.meetings = await this.meetingService.fetchMeetings()
  }

  async fetchSessions(meetingKey:number){
    this.sessions = await this.sessionService.fetchSessions(meetingKey)
  }
}