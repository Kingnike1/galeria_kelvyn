import express from "express";
import Usuario from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/usuario", async (req, res) => {
  try {
    const { email, senha } = req.body;

    // 🔍 Validações básicas
    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    // 📧 Validação simples de email
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValido.test(email)) {
      return res.status(400).json({ error: "Email inválido" });
    }

    // 🔒 Validação de senha
    if (senha.length < 6) {
      return res.status(400).json({ error: "A senha deve ter pelo menos 6 caracteres" });
    }

    // 🚫 Verificar se o usuário já existe
    const usuarioExistente = await Usuario.findOne({ email });

    if (usuarioExistente) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    // 🔐 Criptografar senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // 💾 Criar usuário
    const novoUsuario = new Usuario({
      email,
      senha: senhaHash
    });

    await novoUsuario.save();

    // ❗ Nunca retornar senha
    const usuarioSemSenha = {
      _id: novoUsuario._id,
      email: novoUsuario.email
    };

    res.status(201).json(usuarioSemSenha);

  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

export default router;