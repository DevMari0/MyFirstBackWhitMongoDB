
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./dbconfig/dbconfig";
import session from "express-session";
import addRoutes from "./router";


dotenv.config();

const port = process.env.PORT; 

if (process.env.SESSION_SECRET === undefined) {
  throw new Error("Define SESSION_SECRET");
}

const app = express();
app.use(express.json());

app.use(
    cors({
      origin: process.env.ORIGIN,
      credentials: true,
    })
);

app.use((request, response, next) => {
 // console.log(request.method, request.url);
  next();
});

app.use(session({
  secret: 'il-tuo-secret-qui', // Cambia con un valore sicuro
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));


addRoutes(app);
connectDB();




app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`)
})

  
