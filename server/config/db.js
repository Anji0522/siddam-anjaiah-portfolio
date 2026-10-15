const mongoose = require('mongoose');

let memoryServer = null;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/siddam_portfolio';
  
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500, // Quick timeout if local mongo isn't up
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.warn(`⚠️ Could not connect to primary MongoDB (${uri}): ${err.message}`);
    console.log('🔄 Attempting fallback: Initializing in-memory MongoDB server for development...');
    
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      memoryServer = await MongoMemoryServer.create();
      const memUri = memoryServer.getUri();
      const conn = await mongoose.connect(memUri);
      console.log(`✅ MongoDB Memory Server connected successfully: ${memUri}`);
      return conn;
    } catch (memErr) {
      console.error(`❌ In-memory MongoDB initialization failed: ${memErr.message}`);
      console.info('💡 Note: Set MONGODB_URI in server/.env with your MongoDB Atlas connection string.');
      // Do not hard-crash the entire express process so client & mocked data endpoints can still respond
      return null;
    }
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    if (memoryServer) {
      await memoryServer.stop();
    }
  } catch (err) {
    console.error('Error disconnecting MongoDB:', err);
  }
};

module.exports = { connectDB, disconnectDB };
