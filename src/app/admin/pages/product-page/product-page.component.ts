import { Component, inject, signal } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { StoreService } from '@/stores/services/store.service';
import {
  SendFormInt,
  SendFormUpdate,
} from '../../../stores/interfaces/store.interface';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-product-page',
  imports: [FormComponent, LoadingComponent],
  templateUrl: './product-page.component.html',
  styles: ``,
})
export class ProductPageComponent {
  private readonly activeRouter = inject(ActivatedRoute);
  private readonly storeService = inject(StoreService);
  public isLoading = signal<boolean>(false);
  idProduct = this.activeRouter.snapshot.paramMap.get('id');

  public throwError = signal<string>('');

  productResource = rxResource({
    request: () => ({ id: this.idProduct }),
    loader: ({ request }) => {
      return this.storeService.getReview(request.id!);
    },
  });

  updateData(updateForm: SendFormUpdate | SendFormInt) {
    this.isLoading.set(true);
    this.storeService
      .updateReview(updateForm as SendFormUpdate, this.idProduct!)
      .subscribe((resp) => {
        if (!resp.ok) {
          this.throwError.set(resp.message);
        }
        this.productResource.update((prev) => {
          if (prev) {
            prev.data = resp.review;
          }
          return prev;
        });
        this.isLoading.set(false);
      });
  }
}
