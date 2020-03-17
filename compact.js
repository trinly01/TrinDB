module.exports = (path, data, fs, fileWriteStream) => {
  fs.writeFileSync(path, '')
  for (const key in data) {
    const line = JSON.stringify({
      action: 'create',
      data: data[key]
    })
    fileWriteStream.write(path, `${ line }\r\n`)
  }
}