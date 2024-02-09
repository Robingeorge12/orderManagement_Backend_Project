import express from "express";
import { editOrders, cancelOrders,getOrders, get_buyer_item_data, postOrders, removeOrders } from "../controller/order.controller.js";
import { isAuth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/authorize.js";

export const orderRouter = express.Router()


orderRouter.get("/",getOrders)
orderRouter.get("/:id",isAuth,get_buyer_item_data)

orderRouter.post("/add",isAuth,postOrders)
orderRouter.patch("/edit/:id",isAuth,isAdmin,editOrders)
orderRouter.patch("/cancel/:id",isAuth,cancelOrders)
orderRouter.delete("/remove/:id",removeOrders)