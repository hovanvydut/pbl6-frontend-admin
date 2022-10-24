import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-post-swiper',
  templateUrl: './post-swiper.component.html',
  styleUrls: ['./post-swiper.component.scss']
})
export class PostSwiperComponent implements OnInit {
  images = []
  constructor( @Inject(MAT_DIALOG_DATA) public data: { images: any[] }) { }

  ngOnInit(): void {
    this.images = this.data.images;
  }

}
