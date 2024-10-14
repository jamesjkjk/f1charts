import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Driver } from 'src/app/models/Driver';
import { DriverService } from 'src/app/services/driver/driver.service';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit, OnDestroy {
  protected drivers: Driver[] = [];
  private driversSub: Subscription | undefined;
  constructor(private driverService: DriverService) { }

  ngOnInit() {
    this.drivers = this.sortDrivers(this.driverService.getDrivers());
    this.driversSub = this.driverService.getDriversListener().subscribe((msg) => {
      this.drivers = this.sortDrivers(msg);
    });
  }

  ngOnDestroy(): void {
    this.driversSub?.unsubscribe()
  }

  private sortDrivers(drivers: Driver[]): Driver[] {
    return drivers.sort((a, b) => (b.is_selected ? 1 : 0) - (a.is_selected ? 1 : 0));
  }

  toggleSelection(driver: Driver) {
    this.driverService.selectDriverByNumber(driver.driver_number)
  }
}
