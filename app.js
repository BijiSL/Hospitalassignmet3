const express=require("express");
const hospitalRouter=require('./routes/hospitalRoute')

// Initializing express
const app=express();
const PORT=3000;
app.use(express.json());
app.use('/hospital',hospitalRouter);

app.get('/',(req,res)=>{
    res.send('From Hospital details');
})
// server in listening mode
app.listen(PORT,()=>{
    console.log(`Server is running on port${PORT}`);
})