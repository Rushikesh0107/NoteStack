import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
// import userRouter from "./routes/User.route.js"
// import adminRouter from "./routes/Admin.route.js"


const app = express();

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "1mb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use(cors({
    origin: ['https://food-delivery-app-rose.vercel.app', 'http://localhost:5173'],
    credentials: true,
}))

// app.use("/api/v1/", adminRouter)

// app.use("/api/v1/users", userRouter)

export { app };