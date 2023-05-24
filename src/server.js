const express = require('express')
const config = require('./config/config')
const helmet = require('helmet')
const cors = require('cors')
const app = express()
const errorMiddleware = require('./middlewares/error.middleware')
const fileUpload = require('express-fileupload')
// Routes
const userRouter = require('./router/user.router')
const gifRouter = require('./router/gif.router')
const categoryRouter = require('./router/category.router')

app.use(express.json())
app.use(cors({
  origin: ['http://localhost:5170']
}))
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: [
        "'self'",
        "https://dev-qgjlr8hrde6g23pf.us.auth0.com",
        "https://lh3.googleusercontent.com",
        "https://asset.cloudinary.com/da0fcwrip/0ccc85f14f7d0aca0ad67fd8d5eafdc4"
      ],
      objectSrc: ["'none'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "https: 'unsafe-inline'"],
      connectSrc: ["'self'", "https://dev-qgjlr8hrde6g23pf.us.auth0.com/oauth/token"],
      "img-src": ["'self'", "https: data:"],
      upgradeInsecureRequests: [],
    },
  },
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
app.use(`/api/${config.app.API_VERSION}`, userRouter)
app.use(`/api/${config.app.API_VERSION}`, gifRouter)
app.use(`/api/${config.app.API_VERSION}`, categoryRouter)
app.use(errorMiddleware)

module.exports = app;