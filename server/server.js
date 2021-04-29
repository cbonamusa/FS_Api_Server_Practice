require('dotenv').config();

/* PARTE DE SERVIDOR */
const express = require('express');
const cors = require('cors');


const app = express();
const config = require("./config")


app.use(cors());
app.use(express.json()); //convierte el body (json) en un objeto js

app.use("/forums", require("./forums"))

app.listen(config.SERVER_PORT,  () => {
    console.log(`Forum side server on port${config.SERVER_PORT}`);
});


