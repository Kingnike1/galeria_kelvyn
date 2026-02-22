import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import fotoRotas from "./routes/photo.routes.js";

dotenv.config();
conectarDB();

const app = express();
app.use(express.json());
app.use("/api", fotoRotas);

app.get("/", (req, res) => {
    res.send("API OK");
});

export default app;