import { GameService } from './../services/game.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../interfaces/game';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.scss'],
})
export class GameTableComponent implements OnInit {
  public games$!: Observable<Game[]>;
  public selectedGame!: Game;
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.games$ = this.gameService.getGames();
  }
}