import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-expansion',
  templateUrl: './category-expansion.component.html',
  styleUrls: ['./category-expansion.component.scss']
})
export class CategoryExpansionComponent implements OnInit {

  panelOpenState = false;

  constructor() { }

  ngOnInit() {
  }

}
