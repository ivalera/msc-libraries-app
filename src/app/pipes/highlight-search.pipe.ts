import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlightSearch',
  standalone: true,
})
export class HighlightSearchPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(text: string, searchTerm: string): SafeHtml {
    if (!searchTerm || !text || searchTerm.trim().length === 0) {
      return this.sanitizer.bypassSecurityTrustHtml(text);
    }

    const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');

    const highlightedText = text.replace(
      regex,
      '<span class="highlight-search">$1</span>'
    );

    return this.sanitizer.bypassSecurityTrustHtml(highlightedText);
  }
}
