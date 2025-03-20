import { Router, Express} from "express"
import accountRoutes from "./userRouter";
import productsRouter from "./productRouter";
import adminRouter from "./adminRouter";

const addRoutes = (app: Express) => {
    const router = Router();
    const privateRouter = Router();
    
    console.log("sono in addRoutes")
    productsRouter(router)
    accountRoutes(router);
    adminRouter(privateRouter)

    app.use("/rest", router);
    app.use("/rest", privateRouter);

  }
  
  export default addRoutes;