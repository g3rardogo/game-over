import { Game } from './game';

export interface Library {
  $key?: string;
  name: string;
  description: string;
  games: Game[];
}
