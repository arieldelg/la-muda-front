import { Pipe, PipeTransform } from '@angular/core';
import { Images } from '../interfaces/store.interface';

@Pipe({
  name: 'customImage',
})
export class CustomImagePipe implements PipeTransform {
  transform(value: Images[] | string | Images): string {
    if (typeof value === 'string') return value;
    if ((value as Images).id) return (value as Images).url;
    if (Array.isArray(value) && value.length > 0) return value[0].url;

    return 'https://res.cloudinary.com/projectsspookyd/image/upload/v1741756077/no-image_keykh7.jpg';
  }
}
