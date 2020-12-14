# Mark's JC Coding Challenge / Managing Users
This was built in React - Node functionality is dependent on using also running [the API concurrently.](https://github.com/TheJumpCloud/jumpcloud-ui-assignment)

## To Use

1. First, make sure the [the API is running](https://github.com/TheJumpCloud/jumpcloud-ui-assignment). Clone that repo, put in your api key, `npm i` then `npm start`. Verify that it's running using either a cURL command 

```
curl --location --request GET 'http://localhost:8005/api/systemusers' \
--header 'Accept: application/json' \
--header 'Content: application/json' \
--header 'x-api-key: your-api-key-here'
```

or running in Postman,

or you could [open the link in your browser.](http://localhost:8005/api/systemusers)

2. Then, `npm i` and `npm start` this repo, and follow the interactions in the application that pops up. It should be intuitive from there (that was my goal, anyway).