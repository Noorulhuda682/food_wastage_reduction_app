const express = require("express");
const app = express();
const cors = require("cors");
const { response } = require("express");

app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/hello_world", (req,res) => {
   res.send("Hello World!")
})

app.listen(PORT , () => {
    console.log(`Server is running on port:${PORT}`);
})