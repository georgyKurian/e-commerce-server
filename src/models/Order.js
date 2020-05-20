import mongoose, { Schema } from 'mongoose';
import mongooseHidden from 'mongoose-hidden';

export const OrderSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  created_at: String,
  status: { type: String, enum: ['pending', 'paid', 'completed', 'confirmed', 'amount-mismatch', 'cancelled', 'refunded'] },
  paymentIntentId: { type: String, index: true },
  products: [
    {
      _id: Schema.Types.ObjectId,
      quantity: Number,
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
  billingAddress: {
    country: String,
    city: String,
    addressLine1: String,
    addressLine2: String,
    postalCode: String,
  },
});

OrderSchema.plugin(mongooseHidden);

OrderSchema.virtual('totalAmount').get = () => this.products.reduce(
  (total, product) => (
    total + product.price * product.quantity
  ), 0,
);

export const OrderModel = mongoose.model('Order', OrderSchema);
