import {
  Component,
  ElementRef,
  inject,
  input,
  linkedSignal,
  OnInit,
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
import {
  Images,
  Review,
  SendFormInt,
  SendFormUpdate,
} from '@/stores/interfaces/store.interface';
import { CustomImagePipe } from '@/stores/pipes/custom-image.pipe';

@Component({
  selector: 'admin-form',
  imports: [ReactiveFormsModule, MatIconModule, CustomImagePipe],
  templateUrl: './form.component.html',
  styles: ``,
})
export class FormComponent implements OnInit {
  ngOnInit(): void {
    if (this.initialValue()?.id) {
      this.form.reset(this.initialValue());
      this.addTag.disable();
      this.form.disable();
      this.disableButton.set(true);
      this.blobImage.set(this.initialValue()!.images);
    }
  }

  private readonly fb = inject(FormBuilder);
  public validatorService = inject(ValidatorService);

  public initialValue = input<Review>();
  public disableButton = signal<boolean>(false);
  public onSubmitForm = signal<boolean>(false);

  public inputThrowError = input<string>();
  public throwError = linkedSignal<string>(() => this.inputThrowError() ?? '');

  public blobImage = signal<string[] | Images[]>([]);
  public filesTemp: FileList | undefined = undefined;

  public sendData = output<SendFormInt | SendFormUpdate>();
  public imagesDeleted = signal<string[]>([]);

  private readonly inputRef =
    viewChild<ElementRef<HTMLInputElement>>('inputImg');

  public disabledButton = signal<boolean>(true);
  public form: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(30)]],
    description: ['', [Validators.required, Validators.maxLength(110)]],
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
    console.log(this.filesTemp);
    const imageUrl: string[] = Array.from(fileList ?? []).map((file) =>
      URL.createObjectURL(file)
    );

    this.blobImage.update((prev) => [...prev, ...imageUrl] as string[]);
  }

  public enableForm() {
    this.disableButton.set(false);
    this.form.enable();
    this.addTag.enable();
  }

  public onSubmit() {
    this.onSubmitForm.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.initialValue()) {
      console.log(this.filesTemp);
      this.sendData.emit({
        form: this.form.value,
        images: this.filesTemp!,
      });
      const refInput = this.inputRef()?.nativeElement;
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
      return;
    }
    this.sendData.emit({
      form: this.form.value,
      images: this.filesTemp,
      imagesDeleted: this.imagesDeleted(),
    });
  }
}
