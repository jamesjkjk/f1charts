import { LapService } from './../../services/lap/lap.service';
import { DriverService } from './../../services/driver/driver.service';
import { SessionService } from './../../services/session/session.service';
import { Component, OnInit } from '@angular/core';
import { MeetingService } from 'src/app/services/meeting/meeting.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private meetingService: MeetingService,
    private sessionService:SessionService,
    private driverService:DriverService,
    private lapService:LapService
  ) {
   }

  async ngOnInit() {
  }
}
