package main

import "net/http"

func router() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("POST /shorten", processIncomingRequests)
	mux.HandleFunc("GET /{key}", handleRedirect)

	return mux
}
