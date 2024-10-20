import dotenv from 'dotenv';
import {connectDB} from './db/index.js';
import { app } from './app.js';
// import Razorpay from 'razorpay';


dotenv.config({
    path: './.env'
});

// console.log(process.env.RAZORPAY_API_KEY);

// export const instance = new Razorpay({
//     key_id: process.env.RAZORPAY_API_KEY,
//     key_secret: process.env.RAZORPAY_API_SECRET,
//   });

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, "0.0.0.0", () => {
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
    })
})
.catch ((error) => {
    console.log("mongoDB connection failed !!!", error);
})
