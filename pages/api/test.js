import { MongoClient, ServerApiVersion } from 'mongodb'
import connectDB from '../../utils/connectDB'

export default function test(req, res) {
  res.json({ test: 'is this working' })
}
