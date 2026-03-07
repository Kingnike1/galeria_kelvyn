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
        default: Date.now
    },
    uploadedBy: {
        type: mongoose.Schema. dealt.Types.ObjectId,
        ref: "Usuario"
    }
});

export default mongoose.model("Foto", fotoSchema);
