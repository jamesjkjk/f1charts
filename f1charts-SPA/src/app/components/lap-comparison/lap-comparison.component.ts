import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CarData } from 'src/app/models/CarData';
import { Driver } from 'src/app/models/Driver';
import { Lap } from 'src/app/models/Lap';
import { CarDataService } from 'src/app/services/carData/carData.service';
import { DriverService } from 'src/app/services/driver/driver.service';
import { LapService } from 'src/app/services/lap/lap.service';
import { MeetingService } from 'src/app/services/meeting/meeting.service';
import { SessionService } from 'src/app/services/session/session.service';
interface Axis {
  domain: number[];
  anchor?: string;
  title?: { text: string; font: { color: string } };
  tickfont?: { color: string };
}

interface Layout {
  title?: { text: string; font: { color: string } };
  xaxis: Axis;
  yaxis: Axis;
  xaxis2: Axis;
  yaxis2: Axis;
  xaxis3: Axis;
  yaxis3: Axis;
  xaxis4: Axis;
  yaxis4: Axis;
  [key: string]: any; // Add an index signature
}
@Component({
  selector: 'app-lap-comparison',
  templateUrl: './lap-comparison.component.html',
  styleUrls: ['./lap-comparison.component.css']
})
export class LapComparisonComponent implements OnInit, OnDestroy {
  form: FormGroup;
  protected drivers: Driver[] = [];
  private driversSub: Subscription | undefined;

  protected laps: Lap[] = []
  private lapsSub: Subscription | undefined

  protected data: any[] = []
  protected layout: Layout = {
    xaxis: {
      domain: [0, 0.45],
      anchor: 'y1',
      title: {
        text: 'Time',
        font: {
          color: 'white'
        }
      },
      tickfont: {
        color: 'white'
      }
    },
    yaxis: {
      domain: [0, 0.45],
      anchor: 'x1',
      title: {
        text: 'RPM',
        font: {
          color: 'white'
        }
      },
      tickfont: {
        color: 'white'
      }
    },
    xaxis2: {
      domain: [0.55, 1],
      anchor: 'y2',
      title: {
        text: 'Time',
        font: {
          color: 'white'
        }
      },
      tickfont: {
        color: 'white'
      }
    },
    yaxis2: {
      domain: [0, 0.45],
      anchor: 'x2',
      title: {
        text: 'Speed',
        font: {
          color: 'white'
        }
      },
      tickfont: {
        color: 'white'
      }
    },
    xaxis3: {
      domain: [0, 0.45],
      anchor: 'y3',
      title: {
        text: 'Time',
        font: {
          color: 'white'
        }
      },
      tickfont: {
        color: 'white'
      }
    },
    yaxis3: {
      domain: [0.55, 1],
      anchor: 'x3',
      title: {
        text: 'Throttle',
        font: {
          color: 'white'
        }
      },
      tickfont: {
        color: 'white'
      }
    },
    xaxis4: {
      domain: [0.55, 1],
      anchor: 'y4',
      title: {
        text: 'Time',
        font: {
          color: 'white'
        }
      },
      tickfont: {
        color: 'white'
      }
    },
    yaxis4: {
      domain: [0.55, 1],
      anchor: 'x4',
      title: {
        text: 'Gear',
        font: {
          color: 'white'
        }
      },
      tickfont: {
        color: 'white'
      }
    },
    width: window.innerWidth - 50,
    height: window.innerHeight - 300,
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    font: {
      color: 'white'
    }
  }

  constructor(
    private driverService: DriverService,
    private lapService: LapService,
    private carDataService: CarDataService
  ) {
    this.form = new FormGroup({
      driver1: new FormControl(null),
      driver2: new FormControl(null),
      lapnumber: new FormControl(null)
    });
  }

  ngOnInit() {
    this.drivers = this.driverService.getDrivers()
    this.driversSub = this.driverService.getDriversListener().subscribe((msg) => {
      this.drivers = msg;
    })

    this.laps = this.lapService.getLaps()
    this.lapsSub = this.lapService.getLapsListener().subscribe((msg) => {
      this.laps = msg
    })
    this.initializeEmptyCharts()
  }

  getDistinctLapNumbers(laps: Lap[]) {
    return [...new Set(laps.map(obj => obj.lap_number))];
  }

  ngOnDestroy(): void {
    this.driversSub?.unsubscribe()
    this.lapsSub?.unsubscribe()
  }

  async onSubmit() {
    const lap1 = this.lapService.getLapByDriverAndLap(
      this.form.get("driver1")?.value,
      this.form.get("lapnumber")?.value
    )
    const lap2 = this.lapService.getLapByDriverAndLap(
      this.form.get("driver2")?.value,
      this.form.get("lapnumber")?.value
    )
    const lap1data = await this.carDataService.fetchCarData(
      this.form.get("driver1")?.value,
      this.lapService.getSession(),
      lap1?.date_start!,
      lap1?.date_end!
    )
    const lap2data = await this.carDataService.fetchCarData(
      this.form.get("driver2")?.value,
      this.lapService.getSession(),
      lap2?.date_start!,
      lap2?.date_end!
    )

    this.drawChart(lap1data, lap2data)
  }

  initializeEmptyCharts() {
    this.data = [
      { x: [], y: [], type: 'scatter', mode: 'lines', xaxis: 'x1', yaxis: 'y1' },
      { x: [], y: [], type: 'scatter', mode: 'lines', xaxis: 'x1', yaxis: 'y1' },

      { x: [], y: [], type: 'scatter', mode: 'lines', xaxis: 'x2', yaxis: 'y2' },
      { x: [], y: [], type: 'scatter', mode: 'lines', xaxis: 'x2', yaxis: 'y2' },

      { x: [], y: [], type: 'scatter', mode: 'lines', xaxis: 'x3', yaxis: 'y3' },
      { x: [], y: [], type: 'scatter', mode: 'lines', xaxis: 'x3', yaxis: 'y3' },

      { x: [], y: [], type: 'scatter', mode: 'lines', xaxis: 'x4', yaxis: 'y4' },
      { x: [], y: [], type: 'scatter', mode: 'lines', xaxis: 'x4', yaxis: 'y4' }
    ]
  }

  drawChart(lap1data: CarData[], lap2data: CarData[]) {
    const driver1 = this.form.get("driver1")?.value as Driver
    const driver2 = this.form.get("driver2")?.value as Driver
    this.data = [
      { x: lap1data.map(d => d.date), y: lap1data.map(d => d.rpm), type: 'scatter', mode: 'lines', name: driver1.last_name, line: { color: driver1.team_colour }, xaxis: 'x1', yaxis: 'y1' },
      { x: lap2data.map(d => d.date), y: lap2data.map(d => d.rpm), type: 'scatter', mode: 'lines', name: driver2.last_name, line: { color: driver2.team_colour }, xaxis: 'x1', yaxis: 'y1' },

      { x: lap1data.map(d => d.date), y: lap1data.map(d => d.speed), type: 'scatter', mode: 'lines', name: driver1.last_name, line: { color: driver1.team_colour }, xaxis: 'x2', yaxis: 'y2' },
      { x: lap2data.map(d => d.date), y: lap2data.map(d => d.speed), type: 'scatter', mode: 'lines', name: driver2.last_name, line: { color: driver2.team_colour }, xaxis: 'x2', yaxis: 'y2' },

      { x: lap1data.map(d => d.date), y: lap1data.map(d => d.throttle), type: 'scatter', mode: 'lines', name: driver1.last_name, line: { color: driver1.team_colour }, xaxis: 'x3', yaxis: 'y3' },
      { x: lap2data.map(d => d.date), y: lap2data.map(d => d.throttle), type: 'scatter', mode: 'lines', name: driver2.last_name, line: { color: driver2.team_colour }, xaxis: 'x3', yaxis: 'y3' },

      { x: lap1data.map(d => d.date), y: lap1data.map(d => d.n_gear), type: 'scatter', mode: 'lines', name: driver1.last_name, line: { color: driver1.team_colour }, xaxis: 'x4', yaxis: 'y4' },
      { x: lap2data.map(d => d.date), y: lap2data.map(d => d.n_gear), type: 'scatter', mode: 'lines', name: driver2.last_name, line: { color: driver2.team_colour }, xaxis: 'x4', yaxis: 'y4' }
    ];
  }

}
