import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Driver } from 'src/app/models/Driver';
import { DriverService } from 'src/app/services/driver/driver.service';
import * as Plotly from 'plotly.js';

@Component({
  selector: 'app-plotly',
  templateUrl: './plotly.component.html',
  styleUrls: ['./plotly.component.css']
})
export class PlotlyComponent implements AfterViewInit {
  @Input() data?: any[];
  @Input() title?: string;
  @Input() xAxisTitle?: string;
  @Input() yAxisTitle?: string;
  layout: any
  @ViewChild('plotlyChart', { static: false }) plotlyChart!: ElementRef;

  constructor(
    private driverService: DriverService,
  ) { }

  ngAfterViewInit() {
    this.layout = {
      title: {
        text: this.title,
        font: {
          color: 'white'
        }
      },
      xaxis: {
        title: {
          text: this.xAxisTitle,
          font: {
            color: 'white'
          }
        },
        tickfont: {
          color: 'white'
        }
      },
      yaxis: {
        title: {
          text: this.yAxisTitle,
          font: {
            color: 'white'
          }
        },
        tickfont: {
          color: 'white'
        }
      },
      width: window.innerWidth - 350,
      height: window.innerHeight - 260,
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      font: {
        color: 'white'
      }
    };
  }
  onPlotlyAfterPlot() {
    this.addLegendClickListener();
  }

  addLegendClickListener() {
    const traces = document.querySelectorAll('.legend .traces');
    traces.forEach((trace: Element) => {
      // Remove any existing click listeners
      trace.replaceWith(trace.cloneNode(true));
    });

    // Re-select the traces after cloning
    const newTraces = document.querySelectorAll('.legend .traces');
    newTraces.forEach((trace: Element) => {
      trace.addEventListener('click', () => {
        const legendText = trace.querySelector('.legendtext');
        const textContent = legendText?.textContent?.trim();
        if (textContent) {
          const driver = this.driverService.getDriverByLastName(textContent);
          if (driver) {
            this.driverService.selectDriverByLastName(textContent);
          } else {
            console.error(`Driver with last name ${textContent} not found.`);
          }
        } else {
          console.error('Legend text not found.');
        }
      });
    });
  }
}