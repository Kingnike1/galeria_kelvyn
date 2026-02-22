import express from "express";
import Fotos from "../models/Photo.js";
import upload from "../middlewares/upload.js";
import cloudinary from "../services/cloudinary.js";

const router = express.Router();

router.post("/fotos", upload.single("image"), async (req, res) => {
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
          imageUrl: result.secure_url
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
        const fotos = await Fotos.find().sort({dataCriacao: -1});
        console.log("Resultado: ", fotos)
        res.json(fotos);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

export default router;