import mongoose from "mongoose"

const { Schema, model } = mongoose;

const userSchema = new Schema({
  From_Account : Number,
  To_Account : Number,
  Amount : Number
 });

const transaction = model('transaction', userSchema);
export default transaction;