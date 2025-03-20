import { Router } from "express";
import createProduct from "../controller/product";
import { isAdmin } from "../middleware/isAdmin";
import { deleteProduct } from "../controller/deleteProduct";


const adminRouter = (app:Router) => {
  const privateRouter = Router();
  console.log("sono in adminRouter")

  privateRouter.post("/product", [isAdmin] ,createProduct ); 
  privateRouter.delete("/rest/product/:id", [isAdmin], deleteProduct)


  app.use("/", privateRouter)
}

export default adminRouter