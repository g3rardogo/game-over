import { Game } from './game';

export interface library {
  $key?: string;
  name: string;
  description: string;
  games: Game[];
}
