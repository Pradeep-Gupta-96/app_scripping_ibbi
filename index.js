import express from "express";
import cors from 'cors'
import { config } from 'dotenv';
import { connectToDatabase } from './src/config/database.js'
import { routes as ibbiRoute } from "./src/ibbi/routs.js";
import { router as userRoute } from './src/users/user_route.js'
import { router as blogRoute } from "./src/blog_post/blog.route.js";
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())



// Load environment variables from config.env file
config({
    path: './src/config/config.env', // Adjust the path as needed
});



connectToDatabase()

app.use("/api", ibbiRoute)
app.use("/user", userRoute)
app.use("/blog", blogRoute)
app.use('/uploads', express.static('src/blog_post/uploads'));


app.get('/', (req, res) => {
    res.send("vighnharth shree ganesha deva")
})


app.listen(process.env.port, () => {
    console.log(`Server running on port ${process.env.port}`)
})