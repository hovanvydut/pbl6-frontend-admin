import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
//
import { ENDPOINTS } from '@app/shared/utilities';
import { svgSearch } from 'src/assets/images/svg-icons.constants';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {
  @Input() searchOnInput: boolean = false;
  @Output() searchKeywordChanged = new EventEmitter<string>();
  @Output() selectedCategoryChanged = new EventEmitter<string>();

  svgSearch = svgSearch;
  ENDPOINTS = ENDPOINTS;
  categories = [
    { name: 'Category 1', id: 1 },
    { name: 'Category 2', id: 2 },
    { name: 'Category 3', id: 3 },
    { name: 'Category 4', id: 4 }
  ];

  searchKeyword: string = '';
  selectedCategory: string;

  private _searchKeywordChanged: Subject<string> = new Subject<string>();

  constructor() {
    this._searchKeywordChanged
      .pipe(
        debounceTime(300), // wait 300ms after the last event before emitting last event
        distinctUntilChanged() // only emit if value is different from previous value
      )
      .subscribe(searchKeyword => {
        this.searchKeyword = searchKeyword;
        this.searchKeywordChanged.emit(searchKeyword);
      });
  }

  ngOnInit() {}

  onSearchKeywordChanged(searchKeyword: string) {
    this._searchKeywordChanged.next(searchKeyword);
  }
}
