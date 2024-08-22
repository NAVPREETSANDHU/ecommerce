import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
const port = process.env.PORT || 8000;
connectDB();

const app = express();
app.use(cors());

app.get('/', (req, res) =>{
    res.send("API is running .....")
});

app.use('/api/products', productRoutes);

app.listen(port, () => console.log(`Server is running on Port ${port}`))
