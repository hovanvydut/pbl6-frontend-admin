import { Component, OnInit } from '@angular/core';
import { completeIconSet } from 'src/assets/images/svg-icons.constants';

@Component({
  selector: 'app-view-icons',
  templateUrl: './view-icons.component.html',
  styleUrls: ['./view-icons.component.scss']
})
export class ViewIconsComponent implements OnInit {
  completeIconSet = completeIconSet;
  constructor() { }

  ngOnInit(): void {
  }

}
