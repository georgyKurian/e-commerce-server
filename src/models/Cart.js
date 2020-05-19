import mongoose, { Schema } from 'mongoose';

export const CartSchema = new mongoose.Schema({
  paymentIntentId: String,
  updated_at: String,
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
  }],
});

CartSchema.virtual('totalAmount').get = () => this.products.reduce(
  (total, product) => (
    total + product.price * product.quantity
  ), 0,
);
export const CartModel = mongoose.model('Cart', CartSchema);
