import { Component, inject } from '@angular/core';
import { StoreCardComponent } from '../../../stores/components/store-card/store-card.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { StoreService } from '@/stores/services/store.service';
@Component({
  selector: 'app-home-page',
  imports: [StoreCardComponent],
  templateUrl: './home-page.component.html',
  styles: ``,
})
export class HomePageComponent {
  private readonly storeService = inject(StoreService);
  reviewResource = rxResource({
    request: () => ({ limit: 5, offset: 0 }),
    loader: ({ request }) => {
      const { limit } = request;
      return this.storeService.getReviews({ limit });
    },
  });
}
