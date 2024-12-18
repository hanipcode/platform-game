//go:build js && wasm

package main

type GameState struct {
	Tilemap *Tilemap
}

func NewGameState(resolution Dimension) *GameState {
	rows := resolution.Height / TILE_HEIGHT
	cols := resolution.Width / TILE_WIDTH

	tilemap := NewTilemap(cols, rows)

	return &GameState{
		Tilemap: tilemap,
	}
}
