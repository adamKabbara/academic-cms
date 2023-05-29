import connectDB from '../../utils/connectDB'
import { MongoClient } from 'mongodb'

export default async function getPosts(req, res) {
  console.log('conn')
  const client = await connectDB()
  console.log('asdjk;fasdjf;')
  const send = await client
    .db('Project0')
    .collection('posts')
    .find({})
    .toArray()

  res.json(send)
}
