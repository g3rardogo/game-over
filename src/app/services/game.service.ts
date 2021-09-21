import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Game } from '../interfaces/game';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private gamesDb: AngularFireList<Game>;

  constructor(private db: AngularFireDatabase) {
    this.gamesDb = this.db.list('/games', (ref) => ref.orderByChild('name'));
  }

  getGames(): Observable<Game[]> {
    return this.gamesDb.snapshotChanges().pipe(
      map((changes) => {
        return changes.map(
          (c) =>
            ({
              $key: c.payload.key,
              ...c.payload.val(),
            } as Game)
        );
      })
    );
  }

  addGame(game: Game) {
    return this.gamesDb.push(game);
  }

  deleteGame(id: string) {
    this.db.list('/games').remove(id);
  }

  editGame(newGameData: any) {
    const $key = newGameData.$key;
    delete newGameData.$key;
    this.db.list('/games').update($key, newGameData);
  }
}
