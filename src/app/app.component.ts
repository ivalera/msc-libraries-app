import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibrarySearchComponent } from './components/library-search/library-search.component';
import { LibraryDetailComponent } from './components/library-detail/library-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LibrarySearchComponent, LibraryDetailComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'msc-libraries-app';
}
