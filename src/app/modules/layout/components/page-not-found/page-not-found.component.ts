import { Component, OnInit } from '@angular/core';
import { ENDPOINTS } from '@app/shared/utilities';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  ENDPOINTS = ENDPOINTS;
  constructor() { }

  ngOnInit() {
  }

}
