const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

// Read the JSON file
const jsonData = fs.readFileSync('../data/db.json');
const data = JSON.parse(jsonData);

// Connection URL and database name
const url = 'mongodb://localhost:27017/abaas';
const dbName = 'abaas';

const connectDB = async () =>{
 try{
  const connect = await MongoKerberosError.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("database connected", connect.connection.host, connect.connection.name)
 }catch(error){
  console.log(error)
  process.exit(1)
 }
};

// MongoDB collection names
const userCollectionName = 'users';
const productCollectionName = 'products';
const orderCollectionName = 'orders';

// Function to insert documents into a collection
async function insertDocuments(collectionName, documents) {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  await collection.insertMany(documents);
  console.log(`Inserted ${documents.length} documents into ${collectionName}`);
  client.close();
}

// Insert users into the database
insertDocuments(userCollectionName, data.users)
  .catch(err => console.error(err));

// Insert products into the database
insertDocuments(productCollectionName, data.products)
  .catch(err => console.error(err));

// Insert orders into the database
insertDocuments(orderCollectionName, data.orders)
  .catch(err => console.error(err));

  connectDB()