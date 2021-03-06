import express from 'express';
import data from "./data.json"
import dotenv from "dotenv";
import config from "./config";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute"
import productRoute from "./routes/productRoute"
import bodyParser from 'body-parser'

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason))

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)

// app.get("/api/products", (req, res) => {
//     res.send(data.products)
// })

// app.get('/api/product/:id', (req, res) => {
//     const productId = req.params.id; 
//     res.send(data.products.find(x => x._id === productId));
//     // if (product) {
//     //     res.send(product)
//     // } else {
//     //     res.status(404).send({msg: "Product not found"})
//     // }

// })

app.listen(port, () => console.log("Server started at http://localhost:5000"))