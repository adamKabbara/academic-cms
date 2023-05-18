import connectDB from './connectDB'

export default async () => {
  const client = await connectDB()

  return await client.db('Project0').collection('posts').find({}).toArray()
}
