import { ChangeDetectorRef, Component, NgZone, ViewChild , OnInit, Input, SimpleChanges} from "@angular/core";
import { BehaviorSubject } from "rxjs";
// swiper
import { SwiperComponent } from "swiper/angular";
// import Swiper core and required components
import SwiperCore , {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
} from 'swiper';
// install Swiper components
SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller
]);

@Component({
  selector: 'app-swiper-template',
  templateUrl: './swiper-template.component.html',
  styleUrls: ['./swiper-template.component.css']
})
export class SwiperTemplateComponent implements OnInit {
  @ViewChild('swiperRef', { static: false }) swiperRef?: SwiperComponent;
  private _images: [];
  @Input()  get images(): [] {
    return this._images;
  }
  set images(images: []) {
    this._images = images;
  }
  @Input() onlyText: boolean = false;

  @Input() type: string;
  @Input() imageStyle: string = '';
  @Input() slidesPerView: number = 1;
  @Input() spaceBetween: number = 20;

  @Input() dynamicBullets: boolean = true;
  @Input() pagination: boolean = true;
  @Input() navigation: boolean = true;
  @Input() imageContain: boolean = false;
  slides$ = new BehaviorSubject<string[]>(['']);
  thumbs: any;
  show: boolean;

  constructor(private cd: ChangeDetectorRef, private ngZone: NgZone) {}

  ngOnInit() {
  }

  getSlides() {
    this.slides$.next(
      Array.from({ length: 600 }).map((el, index) => `Slide ${index + 1}`)
    );
  }

  thumbsSwiper: any;
  setThumbsSwiper(swiper) {
    this.thumbsSwiper = swiper;
  }

  controlledSwiper: any;
  setControlledSwiper(swiper) {
    this.controlledSwiper = swiper;
  }

  slides2 = ['slide 1', 'slide 2', 'slide 3'];
  replaceSlides() {
    this.slides2 = ['foo', 'bar'];
  }

  scrollbar: any = false;
  toggleScrollbar() {
    if (!this.scrollbar) {
      this.scrollbar = { draggable: true };
    } else {
      this.scrollbar = false;
    }
  }

  breakpoints = {
    640: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 4, spaceBetween: 40 },
    1024: { slidesPerView: 4, spaceBetween: 50 }
  };

  slides = Array.from({ length: 5 }).map((el, index) => `Slide ${index + 1}`);
  virtualSlides = Array.from({ length: 600 }).map(
    (el, index) => `Slide ${index + 1}`
  );
  log(log: string) {
    // console.log(string);
  }

  breakPointsToggle: boolean;
  breakpointChange() {
    this.breakPointsToggle = !this.breakPointsToggle;
    this.breakpoints = {
      640: { slidesPerView: 2, spaceBetween: 20 },
      768: { slidesPerView: 4, spaceBetween: 40 },
      1024: { slidesPerView: this.breakPointsToggle ? 7 : 5, spaceBetween: 50 }
    };
  }

  slidesEx = ['first', 'second'];
  onSlideChange(swiper: any) {
    if (swiper.isEnd) {
      // all swiper events are run outside of ngzone, so use ngzone.run or detectChanges to update the view.
      this.ngZone.run(() => {
        this.slidesEx = [...this.slidesEx, `added ${this.slidesEx.length - 1}`];
      });
      console.log(this.slidesEx);
    }
  }
}
