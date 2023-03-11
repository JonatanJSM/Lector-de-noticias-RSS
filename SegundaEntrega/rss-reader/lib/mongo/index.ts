const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const options = {useNewUrlParser: true,useUnifiedTopology: true};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    
    // @ts-ignore
    global._mongoClientPromise = client.connect();
  }
  // @ts-ignore
  clientPromise = global._mongoClientPromise;
  console.log(process.env.NODE_ENV);
} else {    
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
  console.log(process.env.NODE_ENV);
}
export default clientPromise;