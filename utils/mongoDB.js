import { MongoClient } from 'mongodb'

export function connectDB() {
  const uri =
    'mongodb+srv://<adamkabbara>:<adamkabbara123>@cluster0.dfotkzq.mongodb.net/?retryWrites=true&w=majority'

  const client = new MongoClient(uri)

  client.connect().then((res) => console.log('success ' + res))
}
