package main

import (
	"crypto/rand"
	"math/big"
	"strings"
)

func randomGenerator() string {
	randLength := 7
	var v []byte
	const base62 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	for range randLength {
		n, err := rand.Int(rand.Reader, big.NewInt(int64(len(base62))))
		if err != nil {
			panic(err)
		}
		v = append(v, base62[n.Int64()])
	}

	return string(v)
}

func generateUniqueKey(url string) string {
	key := randomGenerator()
	// this can also be achieved via infinite for loops (apparently that's a better approach)

	_, exists := codeMap[key]
	if !exists {
		codeMap[key] = url
		urlMap[url] = key
		return key
	}
	return generateUniqueKey(url)
}

func normalizeUrl(url string) string {

	if strings.HasPrefix(url, "http://") || strings.HasPrefix(url,
		"https://") {
		return url
	}
	return "https://" + url

}
