package main

import (
	"fmt"
	"net/http"
)

var urlMap = map[string]string{}
var codeMap = map[string]string{}

func main() {
	fmt.Println("hello world, the program is running")
	http.ListenAndServe(":3000", router())
}
