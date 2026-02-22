package main

import (
	"net/http"

	"github.com/rs/cors"
)

func router() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("POST /shorten", processIncomingRequests)
	mux.HandleFunc("GET /{key}", handleRedirect)

	return cors.Default().Handler(mux)
}
