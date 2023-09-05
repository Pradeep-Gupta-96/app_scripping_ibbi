import express from "express";
import cors from 'cors'
import { routes } from "./src/routs.js";
const app=express()

app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use("/api",routes)

app.get('/', (req, res) => {
    res.send("vighnharth shree ganesha deva")
})

const port=4000
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})
