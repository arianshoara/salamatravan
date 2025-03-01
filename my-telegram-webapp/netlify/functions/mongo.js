const MongoClient = require('mongodb').MongoClient;

const uri = process.env.MONGODB_URI;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db('sample_mflix'); // نام دیتابیس خود را وارد کنید
  cachedDb = db;
  return db;
}

exports.handler = async (event, context) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('comments'); // نام کالکشن خود را وارد کنید

    // نمونه عملیات: دریافت تمام اسناد از کالکشن
    const data = await collection.find({}).toArray();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};