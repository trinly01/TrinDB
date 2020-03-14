module.exports = (path, data, fs) => {
  fs.writeFileSync(path, '')
  for (const key in data) {
    const line = JSON.stringify({
      action: 'create',
      data: data[key]
    })
    fs.appendFileSync(path, `${ line }\r\n`)
  }
}