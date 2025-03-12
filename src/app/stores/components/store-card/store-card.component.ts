import { Review } from '@/stores/interfaces/store.interface';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'store-card',
  imports: [RouterLink],
  templateUrl: './store-card.component.html',
  styles: ``,
})
export class StoreCardComponent {
  public review = input.required<Review>();
}
