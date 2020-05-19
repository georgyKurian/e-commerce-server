import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String,
  },
  email: String,
  username: String,
  role: { type: String, enum: ['admin', 'customer'] },
});

export const UserModel = mongoose.model('User', UserSchema);
