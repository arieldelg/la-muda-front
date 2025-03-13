import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
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
export class CarouselImagesComponent implements AfterViewInit {
  public swiperRef = viewChild.required<ElementRef<HTMLDivElement>>('swiper');
  ngAfterViewInit(): void {
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
