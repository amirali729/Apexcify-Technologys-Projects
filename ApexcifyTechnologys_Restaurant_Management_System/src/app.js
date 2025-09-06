import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'


 
const app = express()

app.use(cors({
    origin:  process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true, limit: "16kb"}))
// app.use(express.static("public"))
app.use(cookieParser())
app.use(morgan("dev"));

// routes import 
import testRoutes from "./routes/test.route.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import restaurantRoutes from "./routes/restaurant.route.js";
import categoryRoutes from "./routes/category.route.js";
import foodRoutes from "./routes/food.route.js";

//routes declaration 
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/restaurant", restaurantRoutes); // corrected spelling
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/food", foodRoutes);

export { app }