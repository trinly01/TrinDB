module.exports = function mrDot(obj,is, value) {
  try {
    if (typeof is == 'string')
      return mrDot(obj,is.split('.'), value);
    else if (is.length==1 && value!==undefined)
      return obj[is[0]] = value;
    else if (is.length==0)
      return obj;
    else
      return mrDot(obj[is[0]],is.slice(1), value);
  } catch (error) {
    return undefined
  }
}