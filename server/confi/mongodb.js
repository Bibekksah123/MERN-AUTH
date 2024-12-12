import mongoose from 'mongoose';

const connectToDb = async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('conected')
  }

export default connectToDb;
