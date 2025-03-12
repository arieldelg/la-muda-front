import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customImage',
})
export class CustomImagePipe implements PipeTransform {
  transform(value: string[] | string): string {
    if (typeof value === 'string') return value;
    if (value.length > 0) return value[0];

    return 'https://res.cloudinary.com/projectsspookyd/image/upload/v1741756077/no-image_keykh7.jpg';
  }
}
