module.exports = ({app, service}) => {
  return {
    before: {
      all: [
        (req, res, next) => {
          console.log('before All')
          next()
        }
      ],
      get: [
        (req, res, next) => {
          // req.query.$map = obj => obj.desc + ''
          next()
        }
      ],
      find: [
        (req, res, next) => {
          // req.query.$map = obj => obj.desc + ''
          next()
        } 
      ],
      create: [
        (req, res, next) => {
          console.log('ooops', req.body)
          req.body.dateCreated = Date.now()
          next()
        } 
      ],
      patch: [],
      remove: []
    },
    after: {
      all: [],
      get: [
        (result) => {
          return result
        }
      ],
      find: [],
      create: [],
      patch: [],
      remove: []
    }
  }
}