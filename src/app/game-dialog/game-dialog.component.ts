import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Game, GameStudies } from '../interfaces/game';
import { Library } from '../interfaces/library';
import { GameService } from '../services/game.service';
import { LibraryService } from '../services/library.service';

@Component({
  selector: 'app-game-dialog',
  templateUrl: './game-dialog.component.html',
  styleUrls: ['./game-dialog.component.scss'],
})
export class GameDialogComponent implements OnInit {
  private library: any;
  public gameStudies = Object.keys(GameStudies).slice(
    Object.keys(GameStudies).length / 2
  );

  constructor(
    private gameService: GameService,
    private libraryService: LibraryService
  ) {}

  ngOnInit(): void {
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

  private newGame(gameFormValue: any) {
    const key = this.gameService.addGame(gameFormValue).key;
    const gameFormValueKey = {
      ...gameFormValue,
      key,
    };
    const formattedTeam = {
      ...this.library,
      games: [
        ...(this.library.games ? this.library.games : []),
        gameFormValueKey,
      ],
    };
    this.libraryService.editLibrary(formattedTeam);
  }
}
