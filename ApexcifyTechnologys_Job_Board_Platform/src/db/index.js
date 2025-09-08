import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";
// /${DB_NAME}
const connectionDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log(`MONGODB connected host ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection error", error)
        process.exit(1)
    }
}
export default connectionDB