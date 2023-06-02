import { MongoClient } from 'mongodb'

export default function connectDB() {
  const uri = process.env.MONGODB_URI

  const client = new MongoClient(uri)
  client
    .connect()
    .then((res) => console.log(console.log('Connected to database!')))
    .catch((e) => console.log('ERROR CONNECTING: ' + e))

  return client
}
