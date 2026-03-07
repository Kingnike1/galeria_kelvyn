// 🔐 Middleware para verificar se o usuário é administrador
export const verificarAdmin = (req, res, next) => {
    if (!req.usuario) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    if (req.usuario.role !== "admin") {
        return res.status(403).json({ error: "Acesso negado: você não tem permissão para acessar este recurso" });
    }

    next();
};

export default verificarAdmin;
