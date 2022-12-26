import { finalize } from 'rxjs';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { StatisticTypes, ChartTypes } from '../../consts';
import { StatisticKey } from '../../enums';
import {
  StatisticDetailParamsModel,
  StatisticParamsModel
} from '../../models';
import { StatisticService } from '../../services';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NotifyService } from '@app/shared/services/notify.service';
import { STATISTIC_TABS } from '@app/shared/app.constants';

@Component({
  selector: 'app-statistic-revenue',
  templateUrl: './statistic-revenue.component.html',
  styleUrls: ['./statistic-revenue.component.scss']
})
export class StatisticRevenueComponent implements OnInit {
  tabs = STATISTIC_TABS;
  selectedTab = this.tabs[0];

  StatisticTypes = StatisticTypes;
  ChartTypes = ChartTypes;
  range = new FormGroup({
    start: new FormControl<Date | null>(
      new Date(new Date().setDate(new Date().getDate() - 10))
    ),
    end: new FormControl<Date | null>(new Date())
  });
  selectedType = StatisticTypes[0];

  statisticParams: StatisticParamsModel = new StatisticParamsModel({
    key: StatisticKey.Revenue,
    fromDate: new Date(
      new Date().setDate(new Date().getDate() - 10)
    ).toISOString(),
    toDate: new Date().toISOString(),
  });
  statisticDetailParams: StatisticDetailParamsModel = new StatisticDetailParamsModel(
    {
      key: StatisticKey.Revenue,
      date: new Date().toISOString(),
      pageNumber: 1,
      pageSize: 20,
      searchValue: '',
      top: 5
    }
  );
  detailTitle: Date;

  value: number[];
  label: string[];
  detailValue: number[];
  detailLabel: string[];

  statisticData: any;
  statisticDetailData: any;

  selectedChartType = ChartTypes[0].value;
  selectedChartName = ChartTypes[0].name;

  totalRecords: number;
  displayedColumns: string[] = ['email', 'value'];

  isLoading = false;
  isLoadDetail = false;
  isViewDetail = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { hasUpdate: boolean },
    public dialog: MatDialog,
    private notifyService: NotifyService,
    private statisticService: StatisticService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getStatistic();
  }

  getStatistic() {
    this.isLoading = true;
    this.statisticService
      .getStatistic(this.statisticParams)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(res => {
        this.isViewDetail = false;
        this.statisticData = res;
        this.value = res.map(item => {
          return item.statisticValue;
        });
        this.label = res.map(item => {
          return item.statisticDate;
        });
      });
  }

  onDateRangeChanged() {
    this.statisticParams.fromDate = this.range.value.start.toISOString();
    this.statisticParams.toDate = this.range.value.end.toISOString();
    this.getStatistic();
  }

  onDateRangeReset() {
    this.range.reset();
    this.statisticParams.fromDate = null;
    this.statisticParams.toDate = null;
    this.getStatistic();
  }

  onTabChanged() {
    this.getStatistic();
    this.selectedType = StatisticTypes.find(
      item => item.key === this.statisticParams.key
    );
  }

  // hold
  onChartTypeChanged() {
    this.getStatistic();
    this.selectedChartName = ChartTypes.find(
      item => item.value === this.selectedChartType
    ).name;
  }

  chartClick(dataPointIndex: number) {
    if (dataPointIndex !== -1) {
      this.statisticDetailParams.key = this.statisticParams.key;
      this.statisticDetailParams.date = this.statisticData[
        dataPointIndex
      ].statisticDate;
      this.statisticDetailParams.date = this.convertToDate(
        this.statisticData[dataPointIndex].statisticDate
      ).toLocaleDateString();
      this.detailTitle = this.convertToDate(
        this.statisticData[dataPointIndex].statisticDate
      );
      this.isViewDetail = true;

      this.getStatisticDetail();
      this.getStatisticTop();
    }
  }

  getStatisticDetail() {
    this.isLoadDetail = true;

    this.statisticService
      .getStatisticDetail(this.statisticDetailParams)
      .pipe(finalize(() => (this.isLoadDetail = false)))
      .subscribe(res => {
        this.statisticDetailData = res.records;
        this.totalRecords = res.totalRecords;
        this.cdr.detectChanges();
      });
  }

  getStatisticTop() {
    this.isLoadDetail = true;

    this.statisticService
      .getStatisticTop(this.statisticDetailParams)
      .pipe(finalize(() => (this.isLoadDetail = false)))
      .subscribe(res => {
        this.detailValue = res.map(item => {
          return parseInt(item.statisticValue);
        });
        this.detailLabel = res.map(item => {
          return item.email;
        });
        this.cdr.detectChanges();
      });
  }

  pageChangeEvent(event: { pageIndex: number; pageSize: number }) {
    this.statisticDetailParams.pageSize = event.pageSize;
    this.statisticDetailParams.pageNumber = event.pageIndex + 1;
    this.getStatisticDetail();
  }

  onTabClick(tab: any) {
    this.selectedTab = tab;
    switch (this.selectedTab.id) {
      case 'chart':
        this.getStatisticDetail();
        break;
      case 'table':
        this.getStatisticTop();
        break;
    }
  }

  //#region HelperHelper
  convertToDate(dateString) {
    let d = dateString.split('/');
    let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
    return dat;
  }
  // #endregion
}
