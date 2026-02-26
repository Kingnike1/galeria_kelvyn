import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    dataCriacao: {
    type: Date,
    default: Date.now
    }
});

export default mongoose.model("Usuario", usuarioSchema);