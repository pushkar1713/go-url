package main

type reqBody struct {
	Url string `json:"url"`
}

type resBody struct {
	LongUrl  string
	ShortUrl string
	Key      string
}
