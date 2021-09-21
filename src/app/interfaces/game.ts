export interface Game {
  $key?: string;
  name: string;
  description: string;
  year: string;
  genre: string;
  studio: GameStudies;
  released: boolean;
}

export enum GameStudies {
  nintendo = 1,
  rockstarGames,
  electronicArts,
  activision,
  sony,
  bioWare,
  naughtyDog,
  squareEnix,
  capcom,
  microsoft,
  mojang,
  epicGames,
  insomniacGames,
  gameloft,
  beteshda,
  atari,
  beenox,
  sega,
  ubisoft,
}
