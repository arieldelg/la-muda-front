import { Component } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'app-register-page',
  imports: [FormComponent],
  templateUrl: './register-page.component.html',
  styles: ``,
})
export class RegisterPageComponent {
  // private readonly activeRouter = inject(ActivatedRoute);
  // private readonly storeService = inject(StoreService);
  // public idProduct = this.activeRouter.snapshot.params['id'];
  // productResources = rxResource({
  //   request: () => ({ id: this.idProduct }),
  //   loader: ({ request }) => {
  //     const { id } = request;
  //     return this.storeService.getReview(id);
  //   },
  // });
}
