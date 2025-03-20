import { Router } from "express";
import login from "../controller/login";
import register from "../controller/register";




const accountRoutes = (app:Router) => {
  const router = Router();
  console.log("sono in accountRoutes")

  router.post("/login", login ); //autenticazione
  router.post("/register", register );


  app.use("/",  router)
}

export default accountRoutes