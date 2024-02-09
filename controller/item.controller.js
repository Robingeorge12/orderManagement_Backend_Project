import mongoose from "mongoose";
import ItemModel from "../model/item.model.js";
import { UserSchema } from "../model/user.model.js";

export const addingItem = async (req, res) => {
  try {
    const { role_id } = req
    let objectId = new mongoose.Types.ObjectId(role_id);
    let userId = objectId.toString();
    // console.log("user id", userId)
    const {product_name,product_price,product_category,product_brand,product_quantity,
      productId,product_date,description,product_url,product_count,seller}= req.body;
   
      // const payload =  {product_name,product_price,product_category,product_brand,product_quantity,
      //   productId,product_gender,product_size,description,product_url,creator:userId}
//  console.log(payload);
//  console.log(payload.creator);



    let find_privilaged_user = await UserSchema.findOne({ _id: userId },"-password");
    console.log("user from", find_privilaged_user);
    if (!find_privilaged_user) {
      return res
        .status(422)
        .send({ message: "You Can't Add Data, Please Contact Admin" });
    }
    // console.log(find_privilaged_user);
    const payload =  {product_name,product_price,product_category,product_brand,product_quantity,
      productId,product_date,description,product_url,product_count,seller:userId}

    let add_item = await ItemModel.create(payload);
    let saveItem = await add_item.save();
    // console.log("save", saveItem);

    return res.status(200).send({message:"Product Added Successfully"})
    
  
    
  } catch (er) {
    console.log(er);
    res.status(500).send({ message: "Server Side Error For Adding Product" });
  }
};

// searching functionality .....................................................................
export const getAllItem = async (req,res)=>{
  try{
    // {

      // "$or":[
      //   {product_brand:{$regex:req.params.type, $options:'i'}},
      //   {product_category:{$regex:req.params.type, $options:'i'}},
      //   {product_name:{$regex:req.params.type,$options:'i'}}
      // ]
      // }
let get_product = await ItemModel.find()
console.log(get_product)
res.status(200).send({message:get_product})

  }catch(er){
    res.status(500).send({message:"Access Request Has Been Denied"})
  }

}


export const edit_item_data = async (req,res)=>{

  try{
    // const {} = req
    const {id} = req.params;
    const { product_quantity, product_url, product_price,product_date } = req.body;

    // const {product_name,product_price,product_category,product_brand,product_quantity,
    //   productId,product_gender,product_size,description,product_url}= req.body;

const updated_data = await ItemModel.findOne({_id:id})
console.log(updated_data)

const isCheck_creator = await UserSchema.findById(updated_data.creator)
console.log(isCheck_creator)

if(isCheck_creator){
if(isCheck_creator.role !=="buyer"){


    updated_data.product_price = product_price;
    updated_data.product_quantity = product_quantity
    //if send more url in image arry , we need to loop[i] and push
    // updated_data.product_url.image.push(product_url.image[0])
// console.log(product_size)

// updated_data.save()
return res.status(200).send({message:"Successfully Edit Data"})

}else{

  return res.status(400).send({message:"Only Admin Or Seller can Edit The Data"})

}

}
return res.status(400).send({message:"You Can't Edit The Field"})

  }catch(er){
    res.status(500).send({message:"Server Error For Update Document",er})
  }

}

export const delete_item = async (req,res)=>{

  try{
    // const {} = req
    const {id} = req.params;
    console.log(id)
    const del = await ItemModel.deleteOne({_id:id})
    res.status(200).send({message:"Deleted Successfully"})
  }catch(er){
    console.log(er)
    res.status(500).send({message:"Server Side Error, Please Check Fields", er})
  }
}




export const another_item_data = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_quantity, product_size, product_price } = req.body;

    const updated_data = await ClothModel.findById(id);

    if (!updated_data) {
      return res.status(404).send({ message: 'Cloth not found' });
    }

    const isCheck_creator = await UserSchema.findById(updated_data.creator);

    if (!isCheck_creator) {
      return res.status(404).send({ message: 'Creator not found' });
    }

    if (isCheck_creator.role !== 'buyer') {
      // Check if the user is not a buyer
      // Update the product_quantity
      updated_data.product_quantity = product_quantity;
      updated_data.product_price = product_price;

      // Update the quant field for the specified size


      if (product_size && product_size.size && product_size.quant) {
        const sizeObj = updated_data.product_size.find((obj) => obj.size === product_size.size);

        if (sizeObj) {
          sizeObj.quant = product_size.quant;
        } else {
          // If the size is not found, you may want to add it to the array
          updated_data.product_size.push({
            size: product_size.size,
            quant: product_size.quant,
          });
        }
      }



      await updated_data.save();
      return res.status(200).send({ message: 'Cloth data updated successfully' });
    } else {
      return res.status(403).send({ message: 'Only Admin or Seller can edit the data' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Server error for updating document', error });
  }
};
