import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connextDB from './configs/db.js';
import userRouter from './Routes/userRoutes.js';

const app = express();

//always import from db.js not db
await connextDB();

//middleware
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>res.send("Server is running"))

//routes
app.use('/api/user',userRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>console.log("Server started on port 3000"));
