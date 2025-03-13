import { Review } from '@/stores/interfaces/store.interface';
import { CustomImagePipe } from '@/stores/pipes/custom-image.pipe';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'admin-table-products',
  imports: [RouterLink, CustomImagePipe],
  templateUrl: './table-products.component.html',
})
export class TableProductsComponent {
  public reviews = input<Review[]>();
}
