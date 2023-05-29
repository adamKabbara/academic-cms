import { MongoClient, ServerApiVersion } from 'mongodb'
import connectDB from '../../utils/connectDB'

export default function test(req, res) {
  let prom = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => resolve('asdf'), 1000)
    })

  prom().then((res) => console.log(res))
  res.json({ test: 'is this working' })
}
