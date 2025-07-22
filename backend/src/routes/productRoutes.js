import express from "express";
import { ensureAuthenticated } from "../middlewares/productLoginAuth.js";

const productRouter = express.Router();

//Route protection to show product only upon login
productRouter.get("/", ensureAuthenticated, (req,res)=>{
    res.status(200).json([
        {name: "Product 1", description:"Product 1 Description", price: 100},
        {name: "Product 2", description:"Product 2 Description", price: 200},
    ]);
});

export default productRouter;