import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeetingService } from './services/meeting/meeting.service';
import { ComponentsModule } from './components/components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DriverService } from './services/driver/driver.service';
import { LapService } from './services/lap/lap.service';
import { SessionService } from './services/session/session.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule
  ],
  providers: [
    MeetingService,
    DriverService,
    LapService,
    SessionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
