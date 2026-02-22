import mongoose from "mongoose";

const fotoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    dataCriacao: {
        type: Date,
        required: true
    }
});

export default mongoose.model("fotos", fotoSchema);