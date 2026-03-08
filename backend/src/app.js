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
  origin: "*"
}));

app.use(express.json());
app.use("/api", fotoRotas);
app.use("/api", fotoRotass);
app.use("/api", usuarioRotas);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../../frontend")));

app.use("/img", express.static(path.resolve("frontend/img")));

// ℹ️ As rotas de página HTML não devem usar verificarToken no servidor,
// pois o navegador não consegue enviar cabeçalhos Authorization em navegação normal.
// A proteção é feita pelo JavaScript do frontend (verificando o token no localStorage).
app.get("/formulario", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/i.html"))
})

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/login.html"))
})

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dashboard.html"))
})

// Rota raiz - retorna mensagem de API
app.get("/", (req, res) => {
    res.json({ 
        message: "Galeria Kelvyn API",
        version: "1.0.0",
        status: "online"
    });
})

// Rota para servir o frontend em produção
if (process.env.NODE_ENV === "production") {
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../../frontend/index.html"))
    })
}


// Logs de configuração (comentados para produção)
// console.log("Cloud:", process.env.CLOUD_NAME);
// console.log("Key:", process.env.API_KEY);
// console.log("Secret:", process.env.API_SECRET);

export default app;
