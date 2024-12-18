package main

const (
	TILE_HEIGHT = 16
	TILE_WIDTH  = 16
)

type Tile struct {
	Position Point
	Size     Dimension
}

func NewTile(x int, y int, width int, height int) *Tile {
	return &Tile{
		Position: Point{
			X: x,
			Y: y,
		},
		Size: Dimension{
			Width:  width,
			Height: height,
		},
	}
}

type Tilemap struct {
	Tiles [][]*Tile
}

func NewTilemap(rows int, columns int) *Tilemap {
	tiles := make([][]*Tile, rows)
	for row := 0; row < rows; row++ {
		tiles[row] = make([]*Tile, columns)
		for column := 0; column < columns; column++ {
			tiles[row][column] = NewTile(row*TILE_HEIGHT, column*TILE_WIDTH, TILE_WIDTH, TILE_HEIGHT)
		}
	}

	return &Tilemap{
		Tiles: tiles,
	}
}
