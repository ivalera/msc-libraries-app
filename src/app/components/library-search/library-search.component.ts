import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, tap, debounceTime } from 'rxjs/operators';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { LibraryService } from '../../services/library.service';
import { HighlightSearchPipe } from '../../pipes/highlight-search.pipe';
import { Library } from '../../models/library.models';

@Component({
  selector: 'app-library-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    HighlightSearchPipe,
  ],
  templateUrl: './library-search.component.html',
  styleUrls: ['./library-search.component.scss'],
})
export class LibrarySearchComponent implements OnInit {
  searchControl = new FormControl('');
  libraries$: Observable<Library[]> | null = null;
  currentSearchTerm = '';
  isSearching = false;
  hasSearched = false;
  noResults = false;

  private searchSubject = new BehaviorSubject<string>('');

  constructor(private libraryService: LibraryService) {}

  ngOnInit(): void {
    this.libraries$ = this.searchSubject.pipe(
      debounceTime(300),
      tap(() => {
        this.isSearching = true;
        this.noResults = false;
        this.searchControl.disable();
      }),
      switchMap((searchTerm) => {
        if (!searchTerm) {
          this.hasSearched = false;
          this.isSearching = false;
          this.noResults = false;
          this.searchControl.enable();
          return [];
        }
        this.currentSearchTerm = searchTerm;
        return this.libraryService.searchLibraries(searchTerm);
      }),
      tap((libraries) => {
        this.isSearching = false;
        this.hasSearched = true;
        this.noResults = libraries.length === 0;
        this.searchControl.enable();
      })
    );
  }

  searchLibraries(): void {
    const searchTerm = this.searchControl.value?.trim();
    if (searchTerm) {
      this.currentSearchTerm = searchTerm;
      this.searchSubject.next(searchTerm);
    }
  }

  selectLibrary(library: Library): void {
    this.libraryService.selectLibrary(library);
  }

  getLibraryAddress(library: Library): string {
    if (library.Cells.ObjectAddress && library.Cells.ObjectAddress.length > 0) {
      return library.Cells.ObjectAddress[0].Address;
    }
    return 'Адрес не указан';
  }
}
