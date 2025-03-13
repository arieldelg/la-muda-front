import { Component, inject } from '@angular/core';
import { CarouselImagesComponent } from '../../../shared/components/carousel-images/carousel-images.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ValidatorService } from '@/admin/services/validator.service';
@Component({
  selector: 'admin-form',
  imports: [
    CarouselImagesComponent,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './form.component.html',
  styles: ``,
})
export class FormComponent {
  public readonly fb = inject(FormBuilder);
  public validatorService = inject(ValidatorService);
  public form: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    badge: [''],
    tags: [[], [Validators.required]],
    images: [[]],
  });

  public addTag = this.fb.control([]);

  get tags() {
    return this.form.controls['tags'].value as any[];
  }

  public onAddTag() {
    if (this.addTag.value?.length === 0) return;

    this.form.controls['tags'].setValue([...this.tags, [this.addTag.value]]);
    this.addTag.reset();
  }

  public deleteTag(index: number) {
    this.tags.splice(index, 1);
  }

  public onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
  }
}
