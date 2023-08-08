const dotenv = require('dotenv')

dotenv.config()

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Express!')
})

app.get('/secret', (req, res) => {
  res.send(process.env.ENV_SECRET)
})

app.listen(port, () => {
  console.log(`Hello World on port ${port}`)
})