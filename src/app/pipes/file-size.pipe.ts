import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fileSize', standalone: true })
export class FileSizePipe implements PipeTransform {
  transform(bytes: number | null | undefined, decimalPoints = 1): string {
    if (bytes == null || isNaN(bytes)) return '';
    if (bytes === 0) return '0 B';
    const k = 1024;
    const dm = Math.max(0, decimalPoints);
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const value = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
    return `${value} ${sizes[i]}`;
  }
}
