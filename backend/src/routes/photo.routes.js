import express from "express";
import Fotos from "../models/Photo.js"

const router = express.Router();

router.post("/fotos", async (req, res) => {
    try {
        console.log("Dados recebidos:", req.body);
        const {titulo, imageUrl} = req.body;

        const fotos = await Fotos.create({
            titulo,
            imageUrl
        });

        console.log("Foto salva com sucesso:", fotos);

        res.status(201).json(fotos);

    
    } catch (error) {
        res.status(500).json({error: error.message});
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