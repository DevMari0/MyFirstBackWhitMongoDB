import { Router } from "express";
import { checkLogin } from "../middleware/isLogin";
import { getPublicProducts } from "../controller/allProduct";
import { AllProductsQ } from "../controller/allProductQ";



const productsRouter = (app:Router) => {
  const router = Router();
  console.log("sono in productsRouter")

  router.get("/products/public", getPublicProducts ); //lista di tutti i prodotti
  router.get("/products",[checkLogin], AllProductsQ ); //lista di tutti i prodotti con quantità esatta

  app.use("/prodotti", router)
}

export default productsRouter