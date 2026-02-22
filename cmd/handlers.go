package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func processIncomingRequests(w http.ResponseWriter, r *http.Request) {
	// body, err := io.ReadAll(r.Body)
	// if err != nil {
	// 	panic(err)
	// }
	// fmt.Println(string(body))
	// w.WriteHeader(http.StatusAccepted)

	var payload reqBody // or payload := reqBody{}
	fmt.Printf("this is before decoding %+v\n", payload)
	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		panic(err)
	}
	fmt.Printf("this is after decoding %+v\n", payload)

	url := normalizeUrl(payload.Url)

	value, exists := urlMap[url]
	if exists {
		shortUrl := fmt.Sprintf("%v/%v", baseUrl, value)
		response := resBody{
			LongUrl:  url,
			ShortUrl: shortUrl,
			Key:      value,
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
		return
	}

	randomKey := generateUniqueKey(url)
	formattedUrl := fmt.Sprintf("%s/%s", baseUrl, randomKey)
	response := resBody{
		LongUrl:  url,
		ShortUrl: formattedUrl,
		Key:      randomKey,
	}

	urlMap[url] = randomKey
	fmt.Printf("this is the code map %+v\n", codeMap)
	fmt.Printf("this is the url map %+v\n", urlMap)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func handleRedirect(w http.ResponseWriter, r *http.Request) {
	key := r.PathValue("key")
	value, exists := codeMap[key]
	// if exists {
	// 	w.WriteHeader(http.StatusFound)
	// 	w.Header().Set("Location", value)
	// 	return
	// }
	// w.WriteHeader(http.StatusBadRequest)
	if !exists {
		http.NotFound(w, r)
		return
	}
	http.Redirect(w, r, value, http.StatusPermanentRedirect)
}
