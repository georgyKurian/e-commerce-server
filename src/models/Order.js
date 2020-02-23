import mongoose, { Schema } from 'mongoose';

export const OrderSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  created_at: String,
  products: [
    {
      _id: Schema.Types.ObjectId,
      name: String,
      price: Number,
      images: [String],
      categories: [String],
    },
  ],
  contact: {
    fullName: String,
    phoneNumber: String,
  },
  shippingAddress: {
    country: String,
    city: String,
    addressLine1: String,
    addressLine2: String,
    postalCode: String,
  },
});

export const OrderModel = mongoose.model('Order', OrderSchema);
