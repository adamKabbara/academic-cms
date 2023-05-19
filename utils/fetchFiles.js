import connectDB from './connectDB'

export default async function fetchFiles() {
  const client = await connectDB()

  return await client.db('Project0').collection('posts').find({}).toArray()
}
