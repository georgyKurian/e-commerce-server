import mongoose, { Schema } from 'mongoose';
import mongooseHidden from 'mongoose-hidden';
import { ProductModel } from './Product';


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


OrderSchema.methods.setProducts = function (items) {
  this.products = [];
  const productIdList = items.map((item) => item.productId);
  if (productIdList.length !== 0) {
    return ProductModel.find().where('_id').in(productIdList).exec()
      .then(
        (productList) => {
          items.forEach((item) => {
            for (let i = 0; i < productList.length; i += 1) {
              if (productList[i].id === item.productId) {
                this.products.push({
                  _id: productList[i]._id,
                  name: productList[i].name,
                  price: productList[i].price,
                  images: productList[i].images,
                  categories: productList[i].categories,
                  quantity: item.quantity,
                });
                return;
              }
            }
            throw new Error('Product not found');
          });
        },
      );
  }
  return null;
};

OrderSchema.virtual('totalAmount').get(function () {
  return this.products.reduce(
    (total, product) => (
      total + product.price * product.quantity
    ), 0,
  );
});

export const OrderModel = mongoose.model('Order', OrderSchema);
