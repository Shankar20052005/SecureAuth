import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./configs/db.js";
import bodyParser from "body-parser";
import cors from 'cors';
import router from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

//default endpoint route
app.use('/auth', router);
app.use('/product', productRouter); //Product Route

//Route and Callback Fn in the GET HTTP Req
app.get('/', (req,res)=>{
    res.send("API is Running");
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`.bgCyan.white);
})