let puzzySearchAnd = (search, text) => {
  let escapeStrRx = string => string.replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&')
  let regExp = new RegExp('(?=.*' + escapeStrRx(search).replace(/ +?/g, ')(?=.*') + ').*',"gi")
  return regExp.test(text)
}

let puzzySearchOr = (search, text) => {
  let escapeStrRx = string => string.replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&')
  let regExp = new RegExp(escapeStrRx(search).replace(/ +?/g, '|') + '',"gi")
  return regExp.test(text)
}

let puzzySearchManual = (keywords, text) => {
  let score = 0
  for (const word of keywords) {
    if (text.indexOf(word) > -1) {
      score = score + 1
    }
  }
  return score
}

let deepSearch = (obj, cb) => { 
  if (typeof obj === "string" || typeof obj === "number") {
    return cb(obj.toString().toLowerCase())
  }
  if (obj !== null && typeof obj === "object") { return Object.values(obj).some(o => deepSearch(o, cb)) }
  if (Array.isArray(obj)) { return obj.some(o => deepSearch(o, cb)) }
  // return (typeof obj === "string" || typeof obj === "number") && regExp.test(obj);
}

module.exports = (search = '', objOrig) => {
  let text = ''
  let _score = 0
  let keywords = search.toLowerCase().replace(/\s\s+/g, ' ').trim().split(' ')
  deepSearch(objOrig, (val) => {
    text = text + ' ' + val
    _score = puzzySearchManual(keywords, text)
    if (_score === keywords.length) {
      return _score
    }
  })
  return {
    _score,
    ...objOrig
  }
}