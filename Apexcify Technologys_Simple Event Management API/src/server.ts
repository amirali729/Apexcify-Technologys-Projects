import express , {Application, application } from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import eventRoutes from './routes/events.route'
import userRoutes from './routes/users.route'

import connectDB from './config/db'

dotenv.config()
const app : Application = express()

app.use(express.json())
app.use(morgan("tiny"))

connectDB();

app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);

const port = process.env.Port || 5000
app.listen(port, () => console.log(`server is runing on port ${port}`))