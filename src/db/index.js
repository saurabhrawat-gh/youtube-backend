import mongoose from 'mongoose'
import chalk from 'chalk'

import { DB_NAME } from '../constants.js'

const connectDB = async () => {
  try {
    const instance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    )
    console.log(chalk.green(`\nMONGO_DB CONNECTED!! DB HOST:${instance.connection.host}`))
  } catch (error) {
    console.log(chalk.red('MONGO_DB CONNECTION FAILED', error))
    process.exit(1)
  }
}

export default connectDB
