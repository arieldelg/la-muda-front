import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  OnChanges,
  SimpleChanges,
  viewChild,
} from '@angular/core';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

@Component({
  selector: 'shared-carousel-images',
  imports: [],
  templateUrl: './carousel-images.component.html',
  styles: ``,
})
export class CarouselImagesComponent implements AfterViewInit, OnChanges {
  public images = input.required<string[]>();
  public swiperRef = viewChild.required<ElementRef<HTMLDivElement>>('swiper');
  public swiper: Swiper | undefined = undefined;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'].firstChange) {
      return;
    }

    if (!this.swiper) return;

    this.swiper.destroy(true, true);
    this.swiperInit();
  }
  ngAfterViewInit(): void {
    this.swiperInit();
  }

  swiperInit() {
    const element = this.swiperRef().nativeElement;
    if (!element) return;
    const swiper = new Swiper(element, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,

      modules: [Navigation, Pagination],

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }
}
