const getRecords = require('./getRecords.js')

module.exports = async (options) => {
  return await (new Promise((resolve, reject) => {
    try {
      getRecords(options, db => {
        resolve(db)
      })
    } catch (error) {
      reject(error)
    }
  }))
}
// try {
//   getRecords('test.db', db => {
    // fcc18599-1e60-44d4-a00c-04f77faf5416
    // db.concat('fcc18599-1e60-44d4-a00c-04f77faf5416', {
    //   arr: ['231']
    // })
    // console.log(db.data)
    // console.log(db.search('timi boado'))
    // console.log(db.sort(db.data, {
    //   lastNane: -1
    // }))
    // console.log(db.find((o) => {
    //   return o.firstName === 'timi'
    // }))
    // for (let index = 0; index < 100; index++) {
    //   db.create({
    //     name: 'pogi'
    //   })
    // }
    // console.log(db.find({}, {
    //   skip: 1
    // }, (obj) => {
    //   return {
    //     rename: obj.name
    //   }
    // }))
    // console.log(db.paginate({
    //   ...db,
    //   limit: 100,
    //   skip: 1
    // }))
//   })
// } catch(err) {
//   console.error(err)
// }
