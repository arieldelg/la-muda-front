import { StoreService } from '@/stores/services/store.service';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { TableProductsComponent } from '../../components/table-products/table-products.component';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

@Component({
  selector: 'products-page',
  imports: [TableProductsComponent, LoadingComponent],
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
