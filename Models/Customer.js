

import mongoose from "mongoose"

const { Schema, model } = mongoose;

const userSchema = new Schema({
  Account_Number : Number,
  User_Name : String,
  Balance : Number
 });

const Customer = model('Customer', userSchema);
export default Customer;