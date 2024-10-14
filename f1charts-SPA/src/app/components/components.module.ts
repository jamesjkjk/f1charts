import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist-min';

PlotlyModule.plotlyjs = PlotlyJS;

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { AppRoutingModule } from '../app-routing.module';
import { DriverListComponent } from './driver-list/driver-list.component';
import { DriverComponent } from './driver-list/driver/driver.component';
import { TestComponent } from './test/test.component';
import { ResultsComponent } from './results/results.component';
import { SessionSelectorComponent } from './session-selector/session-selector.component';
import { PlotlyComponent } from './plotly/plotly.component';
@NgModule({
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    PlotlyModule,
    MatCardModule
  ],
  declarations: [
    DashboardComponent,
    DriverListComponent,
    DriverComponent,
    TestComponent,
    ResultsComponent,
    SessionSelectorComponent,
    PlotlyComponent
  ],
  exports:[
    DashboardComponent,
  ]
})
export class ComponentsModule { }
