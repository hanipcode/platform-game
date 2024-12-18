//go:build js && wasm

package main

import (
	"encoding/json"
	"syscall/js"
)

func main() {
	c := make(chan struct{}, 0)

	gameState := NewGameState(Dimension{Width: 320, Height: 120})
	gameStateJson, _ := json.Marshal(gameState)
	var gameStateMap map[string]interface{}
	json.Unmarshal(gameStateJson, &gameStateMap)
	js.Global().Set("GameState", js.ValueOf(gameStateMap))

	<-c
}
