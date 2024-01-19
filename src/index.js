import dotenv from 'dotenv'

import connectDB from './db/index.js'
import { app } from './app.js'

dotenv.config({ path: './env' })

connectDB()
  .then(() => {
    app.on('error', (error) => {
      console.log('ERROR:', error)
      throw error
    })

    app.listen(process.env.PORT || 8000, () =>
      console.log(
        `Server is up and running on port:${process.env.PORT || 8000}`
      )
    )
  })
  .catch((error) => console.log('MONGODB connection failed!!', error))
