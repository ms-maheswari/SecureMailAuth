require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn");
const router = require("./Routes/router");
const PORT = 5001;



// middleware
app.use(express.json());
app.use(cors());
app.use(router);

app.get('/',(_req, res) => {
    res.send("This is a stack overflow clone API")
})

app.listen(PORT,()=>{
    console.log(`Server start at Port No :${PORT}`)
})
