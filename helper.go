//go:build js && wasm

package main

import "syscall/js"

func jsConsoleLog(value interface{}) {
	jsValue := js.ValueOf(value)
	js.Global().Get("console").Call("log", jsValue)
}
