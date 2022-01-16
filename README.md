# Node Data Finder
Finds data from api. Reduces calls through caching. 

## Usage
```
const {find} = require('node-data-finder')

find("example_type", "https://example-address.to/query/data").then(found => {
    console.log("data found!")
})

```