import mongoose from "mongoose";
import ItemModel from "../model/item.model.js";
import { OrderModel } from "../model/order.model.js";
import { UserSchema } from "../model/user.model.js";
 
export const getOrders = async (req, res) => {
  try {
    // console.log("yes")
    const list_orders = await OrderModel.find();
    if (!list_orders) {
      return res
        .status(201)
        .send({ message: "no order available", list_orders });
    }
    return res.status(200).send({ message: list_orders });
  } catch (er) {
    console.log(er);
  }
};

export const get_buyer_item_data = async (req, res) => {
  try {
    const { authorize_id } = req;
    const { id } = req.params;

    const buyer = await UserSchema.find({ _id: authorize_id });
    const item = await ItemModel.find({ _id: id });

    const result = {
      buyer: buyer,
      product: item,
    };
    console.log(result);
    res.status(200).send({ message: result });
  } catch (er) {
    console.log(er);
    res.status(500).send({ message: er });
  }
};

export const postOrders = async (req, res) => {
  try {
    const { authorize_id } = req;

    const {
      buyer_email,
      buyer_address,
      buyer_pin,
      buyer_mob,
      buyer_state,
      buyer_dist,
      productId,
      product_price,
      order_id,
      order_amount,
      order_Item,
      order_brand,
      order_quantity,
      order_mode,
      order_status,
      order_paymentMode,
      order_date,
      expected_delivery
    } = req.body;
    console.log("order page",product_price);
    const buyer = await UserSchema.findById({ _id: authorize_id });
    console.log(buyer);

    if (buyer) {

      const defaultValues = {
        order_mode: order_mode || "Ordinary",
        order_status: order_status || "Ordered",
        order_paymentMode: order_paymentMode || "COD",
        order_id:order_id ||  (Math.floor(100000 + Math.random() * 9000)).toString(),
        order_date: order_date || new Date()
      };

      console.log(defaultValues.order_mode)

        let cal_delivery = new Date();
        let modifiedDate;
     if (defaultValues.order_mode==="Ordinary") {
       
          cal_delivery.setDate(cal_delivery.getDate() + 4);
           modifiedDate = cal_delivery.toString()
           console.log(modifiedDate)

     }else if(defaultValues.order_mode==="FastTrack"){
      cal_delivery.setDate(cal_delivery.getDate() + 3);
           modifiedDate = cal_delivery.toString()

     }else if(defaultValues.order_mode==="Express"){
      cal_delivery.setDate(cal_delivery.getDate() + 1);
      modifiedDate = cal_delivery.toString()
     }
      
     

      const payload = {
        buyer_id: authorize_id,
        buyer_name: buyer.name,
        buyer_email:buyer.email,
        buyer_address,
        buyer_pin,
        product_price,
        buyer_mob,
        buyer_state,
        buyer_dist,
        productId,
        order_id,
        order_amount,
        order_Item,
        order_brand,
        order_quantity,
        expected_delivery: modifiedDate,
     ...defaultValues
      };
      // console.log(payload);
      const update_order =  await OrderModel.create(payload)
      update_order.save()
      res.status(200).send({ message: update_order });
    
    }
  } catch (er) {
    console.log(er);
  }
};

export const editOrders = async (req, res) => {
  try {

const {role_id} = req
let userId = new mongoose.Types.ObjectId(role_id)
 let id_user = userId.toString()
const {id} = req.params;

  let order_details = await OrderModel.findById(id)
  // console.log(order_details)
let user_check = await UserSchema.findById(id_user)

// console.log(user_check)
if(!user_check){
  res.status(400).send("message:","User does't exists")
}

if(user_check.role!=="buyer"){

  let order_details = await OrderModel.findById(id) 
   
  // order_details.order_status = 
  // let updateOrder = await OrderModel.findOneAndUpdate({_id:role_id},) 
  order_details.order_status = req.body.order_status;
  order_details.save()
  res.status(200).send({message:"updated order status"})

}


  } catch (er) {
    console.log(er);
    res.status(500).send("message:","server error",er)
  }
};

export const cancelOrders = async (req, res) => {
  try {
    
    const {id} = req.params;
    // console.log("param",id)
    
      console.log("req bosdy",req.body)
    
      let order_details = await OrderModel.findById(id)
      // console.log(order_details)

      // let updateOrder = await OrderModel.findOneAndUpdate({_id:role_id},) 
      order_details.order_status = req.body.order_status;
      order_details.save()
      res.status(200).send({message:"Updated Order Status By CUSTOMER"})
    
    
    
    
      } catch (er) {
        console.log(er);
        res.status(500).send("message:","server error",er)
      }
};

export const removeOrders = async (req, res) => {
  try {
    console.log("yes");
  } catch (er) {
    console.log(er);
  }
};
