import { CustomImagePipe } from '@/stores/pipes/custom-image.pipe';
import { StoreService } from '@/stores/services/store.service';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'products-page',
  imports: [CustomImagePipe, RouterLink],
  templateUrl: './products-page.component.html',
  styles: ``,
})
export class ProductsPageComponent {
  private readonly storeService = inject(StoreService);

  reviewResource = rxResource({
    request: () => ({}),
    loader: () => {
      return this.storeService.getReviews({ limit: 10, offset: '0' });
    },
  });
}
