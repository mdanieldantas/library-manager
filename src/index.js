require("dotenv").config();
const authRouter  = require("./routes/auth");
const apiRouter = require("./routes/api");
const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error-middleware");



const app = express();
// Habilitar CORS para todas as origens
app.use(cors());



app.use(express.json());
app.use("/auth", authRouter);
app.use("/api", apiRouter);

app.use(errorMiddleware);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



