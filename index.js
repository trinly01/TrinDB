const express = require('express')
// const trinDB = require('./TrinDB.js')
const trinDB = require('trin.db')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/tests', (req, res) => {
  const params = {}
  if (req.query.s) Object.assign(params, app.trinDB.testsSrvc.search(req.query.s))
  if (req.query) Object.assign(params, req.query)
  let result = app.trinDB.testsSrvc.paginate(params)
  res.json(result)
})

app.get('/tests/find', (req, res) => {
  // console.log(res)
  let result = app.trinDB.testsSrvc.find({
    // query: {
    //   firstName: 'Lovely',
    //   lastName: 'Boado'
    // },
    // query (obj) {
    //   return obj.firstName === 'Trinmar'
    // },
    // map (o) {
    //   return {
    //     fullName: o.lastName + ' ' + o.firstName
    //   }
    // }
  })
  res.json(result)
})

app.get('/tests/create', (req, res) => {
  // console.log(res)
  let result = app.trinDB.testsSrvc.create({
    firstName: 'Lovely',
    lastName: 'Boado'
  })
  res.json(result)
})

let _id = '04918e2f-122a-4f01-86c0-236a02cd763f'

app.get('/tests/edit', (req, res) => {
  // console.log(res)
  let result = app.trinDB.testsSrvc.patch(_id, {
    firstName: 'Lovely',
    lastName: 'Boado',
    newProp: {
      counter: 0
    },
    arr: ['a', 'b', 'c', 'd', 'e', 'f']
  })
  _id = result._id
  res.json(result)
})
app.get('/tests/remove', (req, res) => {
  let data = app.trinDB.testsSrvc.create({
    firstName: 'Pogi',
    lastName: 'Pogi'
  })
  let result = app.trinDB.testsSrvc.remove(data._id)
  res.json(result)
})
app.get('/tests/deleteProp', (req, res) => {
  let result = app.trinDB.testsSrvc.deleteProps(_id,{
    newProp: true,
    lastName: false
  })
  res.json(result)
})
app.get('/tests/inc', (req, res) => {
  let result = app.trinDB.testsSrvc.inc(_id, {
    'newProp.counter': 5
  })
  res.json(result)
})
app.get('/tests/splice', (req, res) => {
  let result = app.trinDB.testsSrvc.splice(_id, {
    'arr': 2
  })
  res.json(result)
})
app.get('/tests/concat', (req, res) => {
  let result = app.trinDB.testsSrvc.concat(_id, {
    'arr': [1, 2, 3]
  })
  res.json(result)
})
app.get('/tests/push', (req, res) => {
  let result = app.trinDB.testsSrvc.push(_id, {
    'arr': 'test'
  })
  res.json(result)
})

app.listen(port, async () => {
  app.trinDB = {}
  app.trinDB.testsSrvc = await trinDB({
    filename: 'trinDb/test.db',
    inMemoryOnly: false 
  })
  console.log(`TrinDB app listening on port ${port}!`)

})