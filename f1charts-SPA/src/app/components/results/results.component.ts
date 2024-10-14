import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Driver } from 'src/app/models/Driver';
import { Lap } from 'src/app/models/Lap';
import { DriverService } from 'src/app/services/driver/driver.service';
import { LapService } from 'src/app/services/lap/lap.service';
import { MeetingService } from 'src/app/services/meeting/meeting.service';
import { SessionService } from 'src/app/services/session/session.service';
import { PlotlyComponent } from '../plotly/plotly.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {
  protected drivers: Driver[] = [];
  private driversSub: Subscription | undefined;
  protected laps: Lap[] = []
  private lapsSub: Subscription | undefined
  readonly plotlyTitle="Lap vs Lap Time"
  readonly xAxisTitle= 'Lap Number' 
  readonly yAxisTitle= 'Lap Time (seconds)'
  data: any[] = []
  constructor(
    private meetingService: MeetingService,
    private sessionService: SessionService,
    private driverService: DriverService,
    private lapService: LapService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.drivers = this.driverService.getDrivers()
    this.driversSub = this.driverService.getDriversListener().subscribe((msg) => {
      this.drivers = msg;
      this.prepareChartData();
    })
    this.laps = this.lapService.getLaps()
    this.lapsSub = this.lapService.getLapsListener().subscribe((msg) => {
      this.laps = msg
      this.prepareChartData();
    })
    this.prepareChartData();
  }

  ngOnDestroy(): void {
    this.driversSub?.unsubscribe()
    this.lapsSub?.unsubscribe()
  }


  prepareChartData(): void {
    const drivers = [...new Set(this.laps.map(lap => lap.driver_number))];
    this.data = drivers.map(drivernumber => {
      const driver = this.driverService.getDriverByNumber(drivernumber)
      const driverLaps = this.laps.filter(lap => lap.driver_number === drivernumber);
      return {
        x: driverLaps.map(lap => lap.lap_number),
        y: driverLaps.map(lap => lap.lap_duration),
        type: 'scatter',
        mode: 'lines',
        line: {
          color: driver?.team_colour // Example color for the line
        },
        name: `${driver?.last_name}`,
        visible: driver?.is_selected ? true: "legendonly"
      };
    });
  }

  // updateLegendOpacity() {
  //   const traces = document.querySelectorAll('.traces');
  //   traces.forEach((trace: Element) => {
  //     const legendText = trace.querySelector('.legendtext');
  //     if (legendText) {
  //       const textContent = legendText.textContent!.trim();
  //       const driver = this.driverService.getDriverByLastName(textContent)
  //       if (driver) {
  //         this.renderer.setStyle(trace, 'opacity', driver.is_selected ? '1' : '0.5');
  //       }
  //     }
  //   });
  // }

}
   