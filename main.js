const express = require('express')

const app = express()
const port = 3000

const trinDB = require('./TrinDB.js')

app.use(express.json())

const successCallback = async () => {
  const todos = await trinDB({
    filename: 'data/todos.db',
    restful: {
      app,
      url: '/todos',
      hooks
    }
  })
  console.log('App is running')
}

const hooks = ({app, service}) => ({  // Hooks Example
  before: {
    all: [],
    get: [],
    find: [],
    create: [
      (req, res, next) => {
        console.log('before all hook', req.body)
        const data = req.body
        data.dateCreated = Date.now()
        next()
      }
    ],
    patch: [],
    remove: []
  },
  after: {
    all: [
      (result) => {
        console.log(result)
        return result
      }
    ],
  }
})

app.listen(port, successCallback)