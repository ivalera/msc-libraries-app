import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Library } from '../models/library.models';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  private readonly apiUrl = environment.apiUrl;
  private readonly apiKey = environment.apiKey;
  private selectedLibrarySubject = new BehaviorSubject<Library | null>(null);

  public selectedLibrary$ = this.selectedLibrarySubject.asObservable();

  constructor(private http: HttpClient) {}

  searchLibraries(searchTerm: string): Observable<Library[]> {
    if (!searchTerm || searchTerm.trim().length === 0) {
      return of([]);
    }

    const params = {
      api_key: this.apiKey,
      q: searchTerm.trim(),
    };

    return this.http
      .get<Library[]>(this.apiUrl, {
        params,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .pipe(catchError(() => of([])));
  }

  selectLibrary(library: Library | null): void {
    this.selectedLibrarySubject.next(library);
  }

  getSelectedLibrary(): Library | null {
    return this.selectedLibrarySubject.getValue();
  }
}
