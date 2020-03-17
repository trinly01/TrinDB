module.exports = (path, data, fs, fileWriteStream) => {
  fs.writeFileSync(path, '', {encoding: 'utf8'})
  for (const key in data) {
    const line = JSON.stringify({
      action: 'create',
      data: data[key]
    })
    console.log(line)
    fileWriteStream.write(path, `${ line }\r\n`)
  }
}