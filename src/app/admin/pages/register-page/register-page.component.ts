import { Component, inject, signal } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
import { StoreService } from '@/stores/services/store.service';
import {
  SendFormInt,
  SendFormUpdate,
} from '@/stores/interfaces/store.interface';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-register-page',
  imports: [FormComponent, LoadingComponent],
  templateUrl: './register-page.component.html',
  styles: ``,
})
export class RegisterPageComponent {
  private readonly storeService = inject(StoreService);
  public isLoading = signal<boolean>(false);
  public throwError = signal<string>('');

  registerProduct({ form, images }: SendFormInt | SendFormUpdate) {
    this.isLoading.set(true);
    this.storeService.postReview(form, images).subscribe((resp) => {
      if (!resp.ok) {
        this.throwError.set('Error! No se pudo registrar nuevo producto');
        setTimeout(() => {
          this.throwError.set('');
        }, 2500);
      }
      this.isLoading.set(false);
    });
  }
}
