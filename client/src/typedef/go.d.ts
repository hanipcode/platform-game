interface Point {
  X: number;
  Y: number;
}

interface Dimension {
  Width: number;
  Height: number;
}

interface Tile {
  Position: Point;
  Size: Dimension;
}

type Tiles = Tile[][];

interface Tilemap {
  Tiles: Tiles;
}

declare interface GameState {
  Tilemap: Tilemap;
}

declare var GameState: GameState;
