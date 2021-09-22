import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter();
  private library: any;
  public game: any;
  public gameStudies = Object.keys(GameStudies)
    .slice(Object.keys(GameStudies).length / 2)
    .map((key) => ({
      label: key,
      key: GameStudies[key as any],
    }));

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

  onSubmit(gameForm: NgForm) {
    const gameFormValue = { ...gameForm.value };
    if (gameForm.valid) {
      gameFormValue.released =
        gameFormValue.released === '' ? false : gameFormValue.released;
    }
    this.newGame(gameFormValue);
    window.location.replace('#');
  }

  onClose() {
    this.closeDialog.emit(true);
  }
}
