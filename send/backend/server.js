const connectDB = require('./Config/database');
const express = require('express')
const mongoose = require('mongoose');
const authRoutes = require("./Routes/authRoutes");
const configRoutes = require("./Routes/configRoutes");
const signatureRoutes = require("./Routes/signatureRoutes");

const cors = require('cors')
const app = express();
connectDB();

app.use(cors())
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/configs", configRoutes);
app.use("/api/signatures", signatureRoutes);


app.listen(8000, function () {
    console.log('serveur est bien marché')
})


