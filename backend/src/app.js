import path from "path";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import fotoRotas from "./routes/photo.routes.js";
import fotoRotass from "./routes/fotos.routes.js";
import usuarioRotas from "./routes/user.routes.js";
import { fileURLToPath } from "url";

dotenv.config();
conectarDB();

const app = express();

// Configurar CORS
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));

app.use(express.json());
app.use("/api", fotoRotas);
app.use("/api", fotoRotass);
app.use("/api", usuarioRotas);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../../frontend")));

app.use("/img", express.static(path.resolve("frontend/img")));

app.get("/formulario", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/i.html"))
})

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/login.html"))
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/index.html"))
})


// Logs de configuração (comentados para produção)
// console.log("Cloud:", process.env.CLOUD_NAME);
// console.log("Key:", process.env.API_KEY);
// console.log("Secret:", process.env.API_SECRET);

export default app;