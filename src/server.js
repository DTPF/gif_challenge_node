const express = require('express')
const config = require('./config/config')
const cors = require('cors')
const app = express()
const errorMiddleware = require('./middlewares/error.middleware')
const fileUpload = require('express-fileupload')
// Routes

app.use(express.json())
app.use(cors({
  origin: ['http://localhost:5170']
}))
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads',
    limits: { fileSize: 15000000 },
    abortOnLimit: true
  })
)
app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "cross-origin")
  next()
})
app.use(errorMiddleware)

module.exports = app;