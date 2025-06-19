import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { LibraryService } from '../../services/library.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Library } from '../../models/library.models';

@Component({
  selector: 'app-library-detail',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './library-detail.component.html',
  styleUrls: ['./library-detail.component.scss'],
})
export class LibraryDetailComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  selectedLibrary: Library | null = null;

  constructor(private libraryService: LibraryService) {}

  ngOnInit(): void {
    this.libraryService.selectedLibrary$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((library) => (this.selectedLibrary = library));
  }

  closeDetail(): void {
    this.libraryService.selectLibrary(null);
  }

  getAddress(): string {
    if (
      this.selectedLibrary?.Cells.ObjectAddress &&
      this.selectedLibrary.Cells.ObjectAddress.length > 0
    ) {
      return this.selectedLibrary.Cells.ObjectAddress[0].Address;
    }
    return '';
  }

  getChiefName(): string {
    return this.selectedLibrary?.Cells.ChiefName || '';
  }

  getPublicPhone(): string {
    if (
      this.selectedLibrary?.Cells.PublicPhone &&
      this.selectedLibrary.Cells.PublicPhone.length > 0
    ) {
      return this.selectedLibrary.Cells.PublicPhone[0].PublicPhone;
    }
    return '';
  }

  getEmail(): string {
    if (
      this.selectedLibrary?.Cells.Email &&
      this.selectedLibrary.Cells.Email.length > 0
    ) {
      return this.selectedLibrary.Cells.Email[0].Email;
    }
    return '';
  }

  getWebsite(): string {
    return this.selectedLibrary?.Cells.WebSite || '';
  }

  getWebsiteUrl(): string {
    const website = this.selectedLibrary?.Cells.WebSite;
    if (!website) {
      return '';
    }

    if (website.startsWith('http://') || website.startsWith('https://')) {
      return website;
    }

    return `https://${website}`;
  }

  getWorkingHours(): string {
    if (
      this.selectedLibrary?.Cells.WorkingHours &&
      this.selectedLibrary.Cells.WorkingHours.length > 0
    ) {
      return this.selectedLibrary.Cells.WorkingHours.map(
        (wh) => `${wh.DayWeek}: ${wh.WorkHours}`
      ).join(', ');
    }
    return '';
  }
}
