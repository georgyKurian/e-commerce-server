import mongoose, { Schema } from 'mongoose';
import mongooseHidden from 'mongoose-hidden';
import { ProductModel } from './Product';

const opts = { toJSON: { virtuals: true } };

export const ORDER_STATUS = {
  'PENDING' : 'pending',
  'PAYMENT_INITIATED' : 'payment-initiated',
  'PROCESSING' : 'processing',
  'COMPLETED' : 'completed',
  'AMOUNT_MISMATCH' : 'amount-mismatch',
  'FAILED' : 'failed',
  'CANCELLED' : 'cancelled',
  'REFUNDED' : 'refunded'
}

const orderStatusList = Object.keys(ORDER_STATUS);

export const OrderSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required:true,
  },
  status: {
    type: String, 
    enum: [
      ORDER_STATUS.PENDING,
      ORDER_STATUS.PAYMENT_INITIATED,
      ORDER_STATUS.PROCESSING,
      ORDER_STATUS.COMPLETED,
      ORDER_STATUS.AMOUNT_MISMATCH,
      ORDER_STATUS.FAILED,
      ORDER_STATUS.CANCELLED,
      ORDER_STATUS.REFUNDED,
    ],
    required:true,
    set: function (status) {
      this._status = status;
    }
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
    type:{
      addressLine1: { type:String, required:true},
      addressLine2: String,
      city: { type:String, required:true},
      province: { type:String, required:true},
      country: { type:String, required:true},   
      postalCode: { type:String, required:true},
    },
    required:false    
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
