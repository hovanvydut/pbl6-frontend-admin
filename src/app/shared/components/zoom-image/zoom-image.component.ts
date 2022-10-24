import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import mediumZoom from 'medium-zoom';

@Component({
  selector: 'app-zoom-image',
  templateUrl: './zoom-image.component.html',
  styleUrls: ['./zoom-image.component.scss']
})
export class ZoomImageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    const zoomScrollOffset = mediumZoom('[data-zoomable]', {
      margin: 100
    })
  }
}
