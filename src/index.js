require("dotenv").config();
const authRouter  = require("./routes/auth");
const apiRouter = require("./routes/api");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/auth", authRouter);
app.use("/api", apiRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});