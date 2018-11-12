var fs = require('fs')
var express = require('express')

var app = express()

app.use(express.static('build'))

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html')
})

app.listen(3001, () => {
  console.log('listening localhost:3001...')
})
