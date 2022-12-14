// @ts-check
import express from 'express'
import cors from 'cors'
import routerApi from './routes/index.js'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

// import error middlewares
import { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } from './middlewares/error.handler.js'

// Enable authentication and authorization
import './utils/auth/index.js'

const swaggerDocument = YAML.load('./swagger.yaml')

// init the express app
const app = express()
const port = process.env.PORT

// middleware to show the outputs in JSON format
app.use(express.json())

// middleware to document the API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// cors config
const whitelist = ['http://localhost:8080', 'https://myapp.co']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('no permitido'))
    }
  }
}

// load cors config
app.use(cors(options))

app.get('/', (req, res) => {
  res.status(200).send('Welcome!')
})

// router of api, url: domain.com/api/v1/*
routerApi(app)

// Middlewares
app.use(logErrors)
app.use(ormErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)

// run the app on a port
app.listen(port, () => {
  console.log('App runing on port: ' + port)
})
