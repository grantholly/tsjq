# TSJQ - parsing JSON with typescript
(because why not?  Oh and there's tests)

### installing

```
npm install tsjq
```

### usage

##### decoding
```
let tsjq = require('tsjq')

const someJson = '{"a": "yeah"}'

const decoded = tsjq.decode(someJson)
```

##### encoding
```
let tsjq = require('tsjq')

const someJs = {a: "yeah"}

const encoded = tsjq.encode(someJs)
```

### Running tests

```
npm test
```

### Encoding JSON

You can use the `encode` function.

Right now I am not checking for scary stuff like functions

### Decoding JSON

You can use the `decode` function.

Notes.txt currently outlines my troubles trying to get typesafety around decoding.
I wish that I could not use `any` type signatures, but that is beyond me right now ¯\_(ツ)_/¯

### Notes

I originally thought this would be something like JQ (https://stedolan.github.io/jq/), but I got
off track

