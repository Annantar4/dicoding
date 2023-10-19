import express from "express"
import cors from "cors";
import router from "./router.js";

const app = express()

app.use(cors({
    origin: '*'
}))

app.use(express.json())

app.use(router)

app.listen(5000,()=>{
    console.log("server running")
})