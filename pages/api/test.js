import { MongoClient, ServerApiVersion } from 'mongodb'
import connectDB from '../../utils/connectDB'

export default async function test(req, res) {
  let prom = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => resolve('asdf'), 1000)
    })

  const p = await prom()

  res.json({ test: p })
}
