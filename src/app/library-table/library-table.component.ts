import {
  LibraryService,
  LibrariesTableHeaders,
} from './../services/library.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Library } from '../interfaces/library';

@Component({
  selector: 'app-library-table',
  templateUrl: './library-table.component.html',
  styleUrls: ['./library-table.component.scss'],
})
export class LibraryTableComponent implements OnInit {
  public libraries$!: Observable<Library[]>;
  public tableHeaders = LibrariesTableHeaders;
  constructor(private libraryService: LibraryService) {}

  ngOnInit(): void {
    this.libraries$ = this.libraryService.getLibraries();
    this.libraryService
      .getLibraries()
      .pipe(take(1))
      .subscribe((libraries) => {
        if (libraries.length === 0) {
          const library: Library = {
            name: 'MyLibrary',
            description: 'My favorite games',
            games: [],
          };
          this.libraryService.addLibrary(library);
        }
      });
  }
}
