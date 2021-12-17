const { URL } = require('url')

export default function (req, res, next) {
  const baseURL = req.protocol + '://' + req.headers.host + '/'
  const reqUrl = new URL(req.url, baseURL)
  const stream = reqUrl.searchParams.get('stream')
  res.write(JSON.stringify({
    action: `system:tvx:launch:org.videolan.vlc:${stream}`,
    headline: 'My Menu',
    menu: []
  }))
  res.end()
}
