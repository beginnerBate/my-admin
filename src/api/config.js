export function getUrl () {
  return Promise.resolve(baseURL)
}

export function getUrlA () {
  return Promise.resolve(baseURLA)
}
export function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}