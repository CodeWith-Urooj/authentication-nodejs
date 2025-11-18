import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userAuth from './routes/userAuth.js'

const app=express()
dotenv.config()
app.use(express.json())

app.use('/user' ,userAuth )
const MONGO_URI=process.env.MONGO_URI;
const connectMongoDB=async()=>{
try {
    await mongoose.connect(MONGO_URI)
console.log('Database Connected Successfully!')
} catch (error) {
    console.log('Error in Connecting Database')
}
}

connectMongoDB()
const PORT=process.env.PORT || 8080;
app.listen(PORT , ()=>{
    console.log(`Server is running at PORT: ${PORT}`)
})