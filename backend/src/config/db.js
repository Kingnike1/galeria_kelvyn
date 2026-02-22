import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function conectarDB() {
    try {
        await
        mongoose.connect(process.env.moongoUrl);
        console.log("Banco de dados conectado com sucesso!");
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error.message);
        process.exit(1);
    }
}

export default conectarDB;