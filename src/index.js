import dotenv from 'dotenv'
import chalk from 'chalk'

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
        chalk.whiteBright(`Server is up and running on port:${process.env.PORT || 8000}`)
      )
    )
  })
  .catch((error) => console.log(chalk.red('MONGO_DB CONNECTION FAILED', error)))
