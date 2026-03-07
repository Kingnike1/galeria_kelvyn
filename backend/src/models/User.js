import mongoose from "mongoose";

 const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    dataCriacao: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Usuario", usuarioSchema);
