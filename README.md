
# Welcome to Trin.DB!

<!-- <p align="center">
  <img width="300" src="https://miro.medium.com/max/3728/1*7zccGWE4o5LmxegijjK_xQ.png"/>
  <br />
  <img width="300" src="https://feathersjs.com/img/feathers-logo-wide.png" />
</p> -->

A **fast persistent or in memory NoSQL databasse** for any JS framework

 <!-- - [x] DOM / UI (HTML)
 - [x] Data / State (Javascript)
 - [x] Local Storage (Offline)
 - [x] Backend/Database (Cloud) -->

> **Join and support our Community**
> Web and Mobile Developers PH
> [ [Facebook Page](https://fb.com/webmobile.ph) | [Group](https://fb.com/groups/webmobile.ph/) ]

## Installation

```bash
npm install trin.db
```
or
```bash
yarn add trin.db
```

## Usage

```javascript
const trinDB = require('trin.db')

service = await trinDB({
  filename: 'trinDb/test.db',
  inMemoryOnly: false
})
```
## await trinDB(`<object>`)
Returns a trinDB Service

| Object Prop | Type | Description | Default | Mode |
|--|--|--|--|--|
| *filename* | `<string>` | Path to file. Required if in persistent mode | n/a | persistent |
| *inMemoryOnly* | `<boolean>` | ( Optional ) If `true`, database will be in non-persistent mode | `false` | in-memory |

<span id="create"></span>

### *service.create(`<object>`)* 
Returns the created `<object>`
```javascript
/* example existing records (service.data)
  {
    asd: { _id: 'asd', text: 'Hello', read: true, nested: { prop: 'xander' } },
    zxc: { _id: 'zxc', text: 'World', read: false, nested: { prop: 'ford' } }
  }
*/

const result = service.create({
  text: 'Trinmar Pogi'
})

console.log(result)
// { _id: 'qwe', text: 'Trinmar Pogi' }

console.log(service.data)
/* service.data with the newly created object
  {
    asd: { _id: 'asd', text: 'Hello', read: true, nested: { prop: 'xander' } },
    zxc: { _id: 'zxc', text: 'World', read: false, nested: { prop: 'ford' } },
    qwe: { _id: 'qwe', text: 'Trinmar Pogi' }
  }
*/
```

<span id="find"></span>

### *service.find(`<object>`)* 
Returns found data `<object>`
```javascript
/* example existing records (service.data)
  {
    asd: { _id: 'asd', firstName: 'Trinmar', lastName: 'Pogi', age: 20 },
    zxc: { _id: 'zxc', firstName: 'Trinly Zion', lastName: 'Boado', age: 1 },
    qwe: { _id: 'qwe', firstName: 'Lovely', lastName: 'Boado', age: 18 }
  }
*/

// Equality
result = service.find({
  query: {
    lastName: 'Pogi' // equality
  },
  limit: 10, // default 10
  skip: 0 // default 0
})
console.log(result)
/*
  {
    total: 1,
    limit: 10,
    skip: 0,
    data: {
      asd: { _id: 'asd', firstName: 'Trinmar', lastName: 'Pogi', age: 20 }
    }
  }
*/

// Complex Query (conditional >, >==, <, <==, &&, || )
// Map data or select specific props
result = service.find({
  query (obj) {
    return ob.age < 20
  },
  map (obj) {
    return {
      fullName: obj.firstName + ' '+  obj.lastName
    }
  }
})
console.log(result)
/*
  {
    total: 2,
    limit: 10,
    skip: 0,
    data: {
      zxc: { _id: 'zxc', firstName: 'Trinly Zion Boado' },
      qwe: { _id: 'qwe', firstName: 'Lovely Boado' }
    }
  }
*/
```

<span id="search"></span>

### *service.search(`keywords`)* 
fuzzy search finds data based on the keywords (`<String>`) and returns it sorted by `_score`
```javascript
/* example existing records (service.data)
  {
    asd: { _id: 'asd', firstName: 'Trinmar', lastName: 'Boado' },
    zxc: { _id: 'zxc', firstName: 'Trinly Zion', lastName: 'Boado' },
    qwe: { _id: 'qwe', firstName: 'Lovely', lastName: 'Boado' }
  }
*/

result = service.search('ly oad')

console.log(result)
/*
  {
    total: 3,
    data: {
      qwe: { _score: 2, _id: 'qwe', firstName: 'Lovely', lastName: 'Boado', age: 18 },
      zxc: { _score: 2, _id: 'zxc', firstName: 'Trinly Zion', lastName: 'Boado', age: 1 },
      asd: { _score: 1, _id: 'asd', firstName: 'Trinmar', lastName: 'Pogi', age: 20 },
    }
  }
*/
```

<span id="patch"></span>

### *service.patch(_id, `<object>`)* 
Returns the created `<object>`
```javascript
// { _id: 'q12m3k', firstName: 'Trinmar', lastName: 'Boado' nested: { counter: 123 } }

const result = service.patch('q12m3k', {
  lastName: 'Pogi',
  children: ['Trinly Zion']
  'nested.counter': 456
})

console.log(result)
// { _id: 'q12m3k', lastName: 'Pogi' children: ['Trinly Zion'], 'nested.counter': 456 }

console.log(service.data['q12m3k'])
// { _id: 'q12m3k', firstName: 'Trinmar', lastName: 'Pogi', nested: { prop: 456 }, children: ['Trinly Zion'] }
```

<span id="remove"></span>

### *service.remove(_id)* 
Returns the removed `<object>`
```javascript
service.remove('q12m3k')

console.log(service.data['q12m3k'])
// undefined
```

<span id="removeProps"></span>

### *service.removeProps(_id, `<object>`)* 
Returns the removed `<object>` props
```javascript
// { _id: 'q12m3k', firstName: 'Trinmar', lastName: 'Pogi', nested: { prop: 456 }, children: ['Trinly Zion'] }

service.removeProps('q12m3k', {
  lastName: true,
  'nested.prop': true
  firstName: false
})

console.log(service.data['q12m3k'])
// { _id: 'q12m3k', firstName: 'Trinmar', children: ['Trinly Zion'] }
```

<span id="inc"></span>

### *service.inc(_id, `<object>`)* 
Increments specific props and returns the `<object>`
```javascript
// { _id: 'q12m3k', firstName: 'Trinmar', lastName: 'Pogi', nested: { prop: 456 }, children: ['Trinly Zion'] }

service.inc('q12m3k', {
  'nested.prop': 5
})

console.log(service.data['q12m3k'])
// { _id: 'q12m3k', firstName: 'Trinmar', lastName: 'Pogi', nested: { prop: 461 }, children: ['Trinly Zion'] }
```

<span id="splice"></span>

### *service.splice(_id, `<object>`)* 
removs element by index and returns the `<object>`
```javascript
// { _id: 'q12m3k', children: ['Trinly Zion', 'Trinmar Boado'] }

service.splice('q12m3k', {
  'children': 1
})

console.log(service.data['q12m3k'])
// { _id: 'q12m3k', children: ['Trinly Zion'] }
```


<span id="push"></span>

### *service.push(_id, `<object>`)* 
adds one or more elements to the end of an `array and returns the `<object>`
```javascript
// { _id: 'q12m3k', children: ['Trinly Zion', 'Trinmar Boado'] }

service.push('q12m3k', {
  'children': ['Lovely Boado']
})

console.log(service.data['q12m3k'])
// { _id: 'q12m3k', children: ['Trinly Zion', 'Trinmar Boado', 'Lovely Boado'] }
```

<span id="unshift"></span>

### *service.unshift(_id, `<object>`)* 
adds one or more elements to the beginning of an `array` and returns the `<object>`
```javascript
// { _id: 'q12m3k', children: ['Trinly Zion', 'Trinmar Boado'] }

service.unshift('q12m3k', {
  'children': ['Lovely Boado']
})

console.log(service.data['q12m3k'])
// { _id: 'q12m3k', children: ['Trinly Zion', 'Trinmar Boado', 'Lovely Boado'] }
```


<span id="sort"></span>

### *service.sort(data,`<object>`)* 
Sorts the data based on the `<object>` and returns the sorted data
```javascript
/* example existing records (service.data)
  {
    asd: { _id: 'asd', firstName: 'Trinmar', lastName: 'Pogi', age: 20 },
    zxc: { _id: 'zxc', firstName: 'Trinly Zion', lastName: 'Boado', age: 1 },
    qwe: { _id: 'qwe', firstName: 'Lovely', lastName: 'Boado', age: 18 }
  }
*/

// Descending (-1)
result = service.sort({
  data: service.data, // (Optional) if not defined, service.data will be used
  params: {
    age: -1
  }
})

console.log(result)
/*
  {
    asd: { _id: 'asd', firstName: 'Trinmar', lastName: 'Pogi', age: 20 },
    qwe: { _id: 'qwe', firstName: 'Lovely', lastName: 'Boado', age: 18 },
    zxc: { _id: 'zxc', firstName: 'Trinly Zion', lastName: 'Boado', age: 1 }
  }
*/
```

<span id="compact"></span>

### *service.copmact(filename, `<object>`)* 
writes the compact data to a file
| param | Type | Description | Default |
|--|--|--|--|
| *filename* | `<string>` | (Optional) Path to file | current |
|  | `<object>` | ( Optional ) a TrinDB object | `service.data` |
```javascript
service.copmact('test.db', service.data)
```


# *Join and support our Community* <br /> **Web and Mobile Developers PH** <br/> [ [Facebook Page](https://fb.com/webmobile.ph) | [Group](https://fb.com/groups/webmobile.ph/) ]

