import mongoose from "mongoose";

const ProductionShema = mongoose.Schema({

    buyer_email:{type: String,ref:"UserSchema"},
    production_item_name:{type: String, trim: true,ref:"ItemModel" },
    production__item_id: { type: String, trim: true },//uuid
    production_quantity: { type: Number, required: true, trim: true },
    production_order_date :{type:Date, default: Date()},
    production_supply_date :{type:Date}

})

export const ProductionModel = mongoose.model("production",ProductionShema)