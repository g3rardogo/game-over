import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Library } from '../interfaces/library';

export const LibrariesTableHeaders = ['Name', 'Description', 'Games'];

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  private librariesDB: AngularFireList<Library>;
  constructor(private db: AngularFireDatabase) {
    this.librariesDB = this.db.list('/teams', (ref) =>
      ref.orderByChild('name')
    );
  }

  getLibraries(): Observable<Library[]> {
    return this.librariesDB.snapshotChanges().pipe(
      map((changes) => {
        return changes.map(
          (c) =>
            ({
              $key: c.payload.key,
              ...c.payload.val(),
            } as Library)
        );
      })
    );
  }

  addLibrary(library: Library) {
    return this.librariesDB.push(library);
  }

  deleteLibrary(id: string) {
    this.db.list('/libraries').remove(id);
  }

  editLibrary(newLibraryData: any) {
    const $key = newLibraryData.$key;
    delete newLibraryData.$key;
    this.db.list('/libraries').update($key, newLibraryData);
  }
}
