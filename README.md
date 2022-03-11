# Node Data Finder
Finds data from api. Reduces calls through caching. 

## Usage
```
const {find} = require('node-data-finder')

find("example_type", "https://example-address.to/query/data").then(found => {
    console.log("data found!")
})

```
## API

```
find(type::string, query::string, timeout?::Date|number)
```

`type` - a tag used to separate data when it is cached

`query` - a url to make the request to

`timeout` - a date or count in milliseconds when the cache expires

