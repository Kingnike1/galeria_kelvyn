import path from "path";
import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import fotoRotas from "./routes/photo.routes.js";
import { fileURLToPath } from "url";

dotenv.config();
conectarDB();

const app = express();
app.use(express.json());
app.use("/api", fotoRotas);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../../frontend")));

app.get("/formulario", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/i.html"))
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/index.html"))
})

export default app;