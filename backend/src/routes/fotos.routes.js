import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

router.get("/fotos-locais", (req, res) => {
  try {
    const pasta = path.resolve("frontend/img");

    const arquivos = fs.readdirSync(pasta);

    const fotos = arquivos.map((arquivo, index) => ({
      _id: `local-${index}`,
      imageUrl: `/img/${arquivo}`,
      titulo: `Foto ${arquivo}`
    }));

    res.json(fotos);

  } catch (error) {
    res.status(500).json({ error: "Erro ao ler imagens locais" });
  }
});

export default router;