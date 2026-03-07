import express from "express";
import Usuario from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "sua_chave_secreta_super_segura_aqui";

// 📝 Registrar novo usuário
router.post("/registro", async (req, res) => {
  try {
    const { email, senha, nome } = req.body;

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
      senha: senhaHash,
      nome: nome || email.split('@')[0]
    });

    await novoUsuario.save();

    // ❗ Nunca retornar senha
    const usuarioSemSenha = {
      _id: novoUsuario._id,
      email: novoUsuario.email,
      nome: novoUsuario.nome
    };

    res.status(201).json(usuarioSemSenha);

  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

// 🔐 Login do usuário
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    // 🔍 Validações básicas
    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    // 🔎 Procurar usuário
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    // 🔓 Verificar senha
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    // 🎫 Gerar token JWT
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email, nome: usuario.nome },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      usuario: {
        _id: usuario._id,
        email: usuario.email,
        nome: usuario.nome
      }
    });

  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

// 🔑 Middleware para verificar token
export const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido ou expirado" });
  }
};

// ✅ Verificar se o token é válido
router.get("/verificar-token", verificarToken, (req, res) => {
  res.json({ valido: true, usuario: req.usuario });
});

// 👥 Listar todos os usuários (para o dashboard)
router.get("/users", verificarToken, async (req, res) => {
    try {
        const usuarios = await Usuario.find().select("-senha");
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar usuários" });
    }
});

export default router;
