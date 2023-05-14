import connectDB from '../../utils/connectDB'
import { MongoClient } from 'mongodb'
export default async function handler(req, res) {
  const client = await connectDB()

  const send = await client
    .db('Project0')
    .collection('posts')
    .find({})
    .toArray()

  res.json(send)
}
