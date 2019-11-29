import { Schema, Model } from "mongose";

export const ReviewSchema = new Schema({
  order_id: Schema.Types.ObjectId,
  product_id: Schema.Types.ObjectId,
  comment: String,
  rating: {
    type: Number,
    min: 0,
    max: 50,
    validate: {
      validator: function(v) {
        return v % 5 === 0;
      },
      message: props => `${props.value} is not a valid rating`
    }
  }
});

export const ReviewModel = new Model("Review", ReviewSchema);
