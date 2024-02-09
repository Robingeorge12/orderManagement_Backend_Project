import mongoose from "mongoose";

const TrackShema = mongoose.Schema({

    buyer_name:{type: String, required: true, trim: true, ref:"UserSchema" },
    order_address:{type: String, required: true, trim: true},

    order_id: { type: String, trim: true,unique:true },
    order_amount: { type: Number, required: true, trim: true },
    order_Item: { type: String, required: true, trim: true },
    order_quantity: { type: Number, required: true, trim: true },
    order_mode:{type:String,enum:["Ordinary","FastTrack","Express"], default:"Ordinary"},
    order_status:{type: String,default:"Confirmed", trim: true},
    
    expected_delivery:{type:Date},
    order_date :{type:Date, default: Date()},


})

export const trackModel = mongoose.model("track",TrackShema)