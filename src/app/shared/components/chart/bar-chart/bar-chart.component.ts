import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexAnnotations,
  ApexFill,
  ApexStroke,
  ApexGrid,
  ApexTooltip,
  ApexLegend,
  ChartType
} from 'ng-apexcharts';

type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: any; //ApexXAxis;
  annotations: ApexAnnotations;
  fill: ApexFill;
  stroke: ApexStroke;
  grid: ApexGrid;
  title: string;
  tooltip: ApexTooltip;
  legend: ApexLegend;
};
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @Input() value: number[];
  @Input() label: string[];
  @Input() title: string;
  @Input() yaxisName: string;

  @Output() chartClick: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: '',
          data: []
        }
      ],
      chart: {
        height: 550,
        type: 'bar',
        events: {
          click: (event, chartContext, config) => {
            this.chartClick.emit(config.dataPointIndex);
          }
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '50%',
          borderRadius: 8
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        width: 2
      },

      grid: {
        row: {
          colors: ['#fff', '#f2f2f2']
        }
      },
      xaxis: {
        labels: {
          rotate: -45
        },
        categories: [],
        tickPlacement: 'on'
      },
      yaxis: {
        title: {
          text: 'Tổng'
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100]
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val + '';
          }
        }
      },
      legend: {
        show: true
      }
    };
  }

  ngOnInit(): void {
    if (this.value && this.label) {
      this.chartOptions.series[0].data = this.value;
      this.chartOptions.series[0].name = this.title;
      this.chartOptions.xaxis.categories = this.label;
      this.chartOptions.yaxis.title.text = this.yaxisName;
      this.chartOptions.title = this.title;
    }
  }
}
