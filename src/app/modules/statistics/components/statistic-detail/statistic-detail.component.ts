import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NotifyService } from '@app/shared/services/notify.service';
import { StatisticKey } from '../../enums';
import {
  StatisticDetailParamsModel,
  StatisticParamsModel
} from '../../models';
import { StatisticService } from '../../services';

@Component({
  selector: 'app-statistic-detail',
  templateUrl: './statistic-detail.component.html',
  styleUrls: ['./statistic-detail.component.scss']
})
export class StatisticDetailComponent implements OnInit {
  statisticParams: StatisticDetailParamsModel = new StatisticDetailParamsModel({
    key: StatisticKey.CreatePost,
    date: new Date().toISOString(),
    pageNumber: 1,
    pageSize: 10,
    searchValue: '',
    top: 5
  });
  statisticDetailData: any;
  totalRecords: number;
  displayedColumns: string[] = ['title', 'value'];
  value: number[];
  label: string[];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { statisticData: any; statisticParams: StatisticParamsModel },
    public dialog: MatDialog,
    private statisticService: StatisticService
  ) {
    if (this.data) {
      this.statisticParams.key = data.statisticParams.key;
      this.statisticParams.date = data.statisticData.date;
      this.statisticParams.date = this.convertToDate(
        this.data.statisticData.statisticDate
      ).toISOString();
      this.getStatisticDetail();
      this.getStatisticTop();
    }
  }

  ngOnInit(): void {}

  getStatisticDetail() {
    this.statisticService
      .getStatisticDetail(this.statisticParams)
      .subscribe(res => {
        console.log(res);
        this.statisticDetailData = res.records;
        this.totalRecords = res.totalRecords;
      });
  }

  getStatisticTop() {
    this.statisticService
      .getStatisticTop(this.statisticParams)
      .subscribe(res => {
        this.value = res.map(item => {
          return parseInt(item.statisticValue);
        });
        this.label = res.map(item => {
          return item.title;
        });
      });
  }

  convertToDate(dateString) {
    let d = dateString.split('/');
    let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
    return dat;
  }

  pageChangeEvent(event: { pageIndex: number; pageSize: number }) {
    this.statisticParams.pageSize = event.pageSize;
    this.statisticParams.pageNumber = event.pageIndex + 1;
    this.getStatisticDetail();
  }
}
