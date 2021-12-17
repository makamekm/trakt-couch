import fetch from 'node-fetch'
const torrentToMagnet = require('torrent-to-magnet')
const bodyParser = require('body-parser')
const app = require('express')()

app.use(bodyParser.json())
app.post('/torrent-to-magnet', async (req, res) => {
  const url = req.body.file.replace('https://trakt.rowanberry.xyz:443/', 'http://localhost:9117/')
  res.json({
    magnet: await new Promise((resolve, reject) => {
      torrentToMagnet(url, {}, function (err, uri) {
        // Do something with uri here
        if (err) {
          reject(err)
        } else {
          resolve(uri)
        }
      })
    })
  })
})

app.get('/api/trakt/code', async (req, res) => {
  try {
    const fr = await fetch('https://api.trakt.tv/oauth/device/code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: '94ff3b02fe05bde15a5ccccc0bc3505477577fc9762bd82a9dd1cf545d681739'
      })
    })
    res.status(fr.status)
    res.json(await fr.json())
  } catch (
    error
  ) {
    throw new Error(error.message)
  }
})

app.all('/api/trakt/*', async (req, res) => {
  try {
    const url = 'https://api.trakt.tv/' + req.url.replace('/api/trakt/', '')
    const fr = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'trakt-api-key': '94ff3b02fe05bde15a5ccccc0bc3505477577fc9762bd82a9dd1cf545d681739',
        'trakt-api-version': '2',
        Authorization: req.headers.authorization
        // ...req.headers
      },
      body: req.method !== 'HEAD' && req.method !== 'GET'
        ? JSON.stringify({
          ...req.body,
          client_id: '94ff3b02fe05bde15a5ccccc0bc3505477577fc9762bd82a9dd1cf545d681739',
          client_secret: 'd598f018c26776a18c2c74ea39e6e2c9c94153472a1ae84c5bbada95bc1bdb40'
        })
        : undefined
    })
    res.status(fr.status)
    const text = await fr.text()
    res.send(text)
  } catch (
    error
  ) {
    throw new Error(error.message)
  }
})

module.exports = app
