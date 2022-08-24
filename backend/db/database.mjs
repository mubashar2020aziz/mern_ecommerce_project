import mongoose from 'mongoose';

const connection = async () => {
  const db = process.env.DATABASE;
  try {
    await mongoose.connect(db);
    console.log('database connection successfully and run');
  } catch (err) {
    console.log('data connection error');
  }
};

export default connection;
