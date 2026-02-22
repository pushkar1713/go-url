package main

import (
	"fmt"
	"net/http"
	"os"
)

var urlMap = map[string]string{}
var codeMap = map[string]string{}

func main() {
	fmt.Println("hello world, the program is running")
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	http.ListenAndServe(":"+port, router())
}
