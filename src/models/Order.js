import mongoose, { Schema } from 'mongoose';
import mongooseHidden from 'mongoose-hidden';
import { ProductModel } from './Product';

const opts = { toJSON: { virtuals: true } };

export const OrderSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required:true,
  },
  status: {
    type: String, 
    enum: [
      'pending',
      'paid',
      'completed',
      'confirmed',
      'amount-mismatch',
      'cancelled',
      'refunded'
    ],
    required:true,
  },
  paymentIntentId: { type: String, index: true },
  products: [
    {
      _id: Schema.Types.ObjectId,
      quantity: { type:Number, required:true},
      name: { type:String, required:true},
      price: { type:Number, required:true},
      images: [String],
      productDescription : {
        title : String,
        subtitle : String,
        text : String,
        features : [String],
      }
    },
  ],
  contact: {
    fullName: String,
    phoneNumber: String,
  },
  billingAddress: {
    addressLine1: { type:String, required:true},
    addressLine2: String,
    city: { type:String, required:true},
    province: { type:String, required:true},
    country: { type:String, required:true},   
    postalCode: { type:String, required:true},
  },
  created_at: {type:String,required:true},
},
opts);

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
