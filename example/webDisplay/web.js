const express = require('express')
const app = express()
const { mapDownloader } = require('map-downloader')
const mc = require('reinarpg-bot')
const path = require('path')

const bot = mc.createBot({
  'mapDownloader-outputDir': path.join('./maps/.')
})
bot.loadPlugin(mapDownloader)

app.use(express.static('./public'))

app.get('/maps', (req, res) => {
  const entires = Object.entries(bot.mapDownloader.maps)
  res.json(entires.map(e => {
    return {
      id: e[0],
      data: e[1].toString('base64')
    }
  }))
})

app.listen(8080, () => {
  console.info('Listening on port 8080 http://localhost:8080')
})
