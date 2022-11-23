import {
  Component,
  ViewChild,
  OnInit,
  Input,
  ChangeDetectorRef
} from '@angular/core';
import { ApexLegend, ChartComponent } from 'ng-apexcharts';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
};

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  @Input() value: number[];
  @Input() label: string[];
  @Input() title: string;

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private cdr: ChangeDetectorRef) {
    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 350,
        type: 'pie'
      },
      legend: {
        show: false,
        position: 'bottom',
        formatter: function(legendName) {
          return legendName.substring(0, 35) + '...';
        },
        onItemClick: {
          toggleDataSeries: true
        },
        onItemHover: {
          highlightDataSeries: true
        }
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            }
          }
        }
      ]
    };
  }

  ngOnInit(): void {
    if (this.value && this.label) {
      this.chartOptions.series = this.value;
      this.chartOptions.labels = this.label;
    }
  }
}
