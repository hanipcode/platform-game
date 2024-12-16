//go:build js && wasm

package main

import (
	"syscall/js"
)

func add(this js.Value, p []js.Value) any {
	result := p[0].Int() + p[1].Int()
	return js.ValueOf(result)
}

func main() {
	c := make(chan struct{}, 0)

	js.Global().Set("add", js.FuncOf(add))

	<-c
}
