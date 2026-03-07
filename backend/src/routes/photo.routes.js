import express from "express";
import Fotos from "../models/Photo.js";
import upload from "../middlewares/upload.js";
import cloudinary from "../services/cloudinary.js";
import { verificarToken } from "./user.routes.js";
import verificarAdmin from "../middlewares/verificarAdmin.js";

const router = express.Router();

router.post("/fotos", verificarToken, verificarAdmin, upload.single("image"), async (req, res) => {
  try {
    console.log("📥 Arquivo recebido:", req.file);

    // upload para cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      async (error, result) => {
        if (error) {
          console.log("❌ Cloudinary erro:", error);
          return res.status(500).json({ error });
        }

        // salvar no banco
        const foto = await Fotos.create({
          titulo: req.body.titulo,
          imageUrl: result.secure_url,
          uploadedBy: req.usuario.id
        });

        console.log("✅ Foto salva:", foto);

        res.status(201).json(foto);
      }
    );

    result.end(req.file.buffer);

  } catch (error) {
    console.log("❌ Erro geral:", error);
    res.status(500).json({ error: error.message });
  }
});


router.get("/fotos", async (req, res) => {
    try {
        console.log("BUcando a foto...")
        const fotos = await Fotos.find().populate("uploadedBy", "email nome").sort({dataCriacao: -1});
        console.log("Resultado: ", fotos)
        res.json(fotos);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.delete("/fotos/:id", verificarToken, async (req, res) => {
  try {
    const foto = await Fotos.findById(req.params.id);
    if (!foto) {
      return res.status(404).json({ error: "Foto não encontrada" });
    }

    // Apenas o dono pode deletar
    if (foto.uploadedBy && foto.uploadedBy.toString() !== req.usuario.id) {
      return res.status(403).json({ error: "Você não tem permissão para excluir esta foto" });
    }

    await Fotos.findByIdAndDelete(req.params.id);
    res.json({ message: "Foto excluída com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;