import mongoose from 'mongoose';
import 'dotenv/config';

const { MONGO_URI } = process.env;
export const connect = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log(`DB Connection Success`))
    .catch((err) => {
      console.error('Error connecting to DB:', err);
      process.exit(1);
    });
};
