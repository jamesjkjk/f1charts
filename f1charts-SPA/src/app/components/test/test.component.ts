import { Component, OnInit } from '@angular/core';
import { DriverService } from 'src/app/services/driver/driver.service';
import { LapService } from 'src/app/services/lap/lap.service';
import { MeetingService } from 'src/app/services/meeting/meeting.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
//testsessionkey 9213

  constructor(
    private meetingService:MeetingService,
    private sessionService:SessionService,
    private driverService:DriverService,
    private lapService:LapService
  ) { }

  ngOnInit() {
  }


}
