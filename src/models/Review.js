import mongoose, { Schema } from 'mongoose';

export const ReviewSchema = new Schema({
  title: String,
  comment: String,
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required:true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required:true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required:true,
  },
  created_at: {type:String,required:true,},
  rating: {
    type: Number,
    required:true,
    min: 1,
    max: 50,
    validate: {
      validator(v) {
        return v % 10 === 0;
      },
      message: (props) => `${props.value} is not a valid rating`,
    },
  },
});

export const ReviewModel = mongoose.model('Review', ReviewSchema);
