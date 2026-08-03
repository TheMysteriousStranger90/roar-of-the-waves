import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const ALLOWED_ORIGIN = 'https://w.soundcloud.com';

@Pipe({ name: 'safeResourceUrl', standalone: true })
export class SafeResourceUrlPipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(value: string): SafeResourceUrl | null {
    if (!value.startsWith(ALLOWED_ORIGIN)) {
      console.warn('[SafeResourceUrlPipe] blocked non-allowlisted URL', value);
      return null;
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
