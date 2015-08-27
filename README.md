# unsplash-api
This is a Node.js wrapper for the Unsplash API.

This project is still in development.

## Installation
```
npm i --save unsplash-api
```

## Usage
```js
var unsplash = require('unsplash-api');

// this is required to verify your application's requests
unsplash.init(myApiKey);

var photos = unsplash.getUserPhotos('fletcher_hills', function(err, photos) {
  // do stuff with your newly acquired photos
});

```

License [MIT](https://github.com/noahdietz/unsplash-api/blob/master/LICENSE)
