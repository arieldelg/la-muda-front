import { Review } from '@/stores/interfaces/store.interface';
import { CustomImagePipe } from '@/stores/pipes/custom-image.pipe';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'store-card',
  imports: [RouterLink, CustomImagePipe],
  templateUrl: './store-card.component.html',
  styles: ``,
})
export class StoreCardComponent {
  public review = input.required<Review>();
}
