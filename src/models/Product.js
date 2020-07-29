import mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  adidasId: {type:String,required:true},
  name: {type:String,required:true},
  modelNumber: {type:String,required:true},
  productDescription : {
      title : String,
      subtitle : String,
      text : String,
      features : [String],
  },
  price : Number,
  category : String,
  color : String,
  gender : String,
  sport : [String],
  productType : [String],
  images: [String],
});

export const ProductModel = mongoose.model('Product', ProductSchema);
