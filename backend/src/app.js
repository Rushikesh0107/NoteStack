import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from "./routes/User.routes.js"
import adminRouter from "./routes/Admin.routes.js"
import subjectRouter from "./routes/Subject.routes.js"
import departmentRouter from "./routes/Department.routes.js"
import notesRouter from "./routes/Notes.routes.js"
import pyqRouter from "./routes/pyq.routes.js";

const app = express();

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "1mb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}))

app.use("/api/v1/admin", adminRouter)

app.use("/api/v1/users", userRouter)

app.use("/api/v1/subject", subjectRouter)

app.use("/api/v1/department", departmentRouter)

app.use("/api/v1/notes", notesRouter);

app.use("/api/v1/pyq", pyqRouter);  

export { app };