import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function conectarDB() {
    try {
        const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/galeria_kelvyn";
        await mongoose.connect(mongoUri);
        console.log("✅ Banco de dados conectado com sucesso!");
    } catch (error) {
        console.error("❌ Erro ao conectar ao banco de dados:", error.message);
        process.exit(1);
    }
}

export default conectarDB;