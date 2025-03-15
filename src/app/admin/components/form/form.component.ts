import {
  Component,
  ElementRef,
  inject,
  input,
  linkedSignal,
  output,
  signal,
  viewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ValidatorService } from '@/admin/services/validator.service';
import { SendFormInt } from '@/stores/interfaces/store.interface';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'admin-form',
  imports: [ReactiveFormsModule, MatIconModule, JsonPipe],
  templateUrl: './form.component.html',
  styles: ``,
})
export class FormComponent {
  private readonly fb = inject(FormBuilder);
  public validatorService = inject(ValidatorService);

  public onSubmitForm = signal<boolean>(false);

  public inputThrowError = input<string>();
  public throwError = linkedSignal<string>(() => this.inputThrowError() ?? '');

  public blobImage = signal<string[]>([]);
  public filesTemp: FileList | undefined = undefined;

  public sendData = output<SendFormInt>();

  private readonly inputRef =
    viewChild<ElementRef<HTMLInputElement>>('inputImg');

  public form: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(30)]],
    description: ['', [Validators.required, Validators.maxLength(80)]],
    badge: ['', [Validators.maxLength(10)]],
    tags: [[], [Validators.required, Validators.maxLength(2)]],
    images: [[]],
  });
  public addTag = this.fb.control([]);

  get tags() {
    return this.form.controls['tags'].value as any[];
  }

  public onAddTag() {
    if (this.addTag.value?.length === 0) return;

    this.form.controls['tags'].setValue([...this.tags, this.addTag.value]);
    this.addTag.reset();
  }

  public deleteTag(index: number) {
    const newTags = this.tags.filter((_tag, i) => i !== index);
    this.tags.splice(index, 1);
    this.form.controls['tags'].reset(newTags);
  }

  public onFilesChanged(event: Event) {
    let fileList = (event.target as HTMLInputElement).files;
    if (!fileList) return;

    this.filesTemp = fileList;

    const imageUrl = Array.from(fileList ?? []).map((file) =>
      URL.createObjectURL(file)
    );

    this.blobImage.set(imageUrl);
  }

  public onSubmit() {
    this.onSubmitForm.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const refInput = this.inputRef()?.nativeElement;

    this.sendData.emit({
      form: this.form.value,
      images: this.filesTemp!,
    });

    if (refInput) {
      refInput.value = '';
    }

    this.blobImage.set([]);
    this.filesTemp = undefined;
    this.form.reset({
      title: '',
      description: '',
      badge: '',
      images: [],
      tags: [],
    });
  }
}
