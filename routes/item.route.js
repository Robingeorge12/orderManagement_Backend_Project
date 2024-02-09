import express from "express"
import { isAuth } from "../middleware/auth.js"
import { isAdmin } from "../middleware/authorize.js"
import { addingItem, delete_item, edit_item_data, getAllItem } from "../controller/item.controller.js"


export const itemRouter = express.Router()

itemRouter.get("/",isAuth,getAllItem)
itemRouter.post("/add_item",isAuth,isAdmin,addingItem)
itemRouter.patch("/update/:id",isAuth,isAdmin,edit_item_data)
itemRouter.delete("/remove/:id",isAuth,isAdmin,delete_item) 