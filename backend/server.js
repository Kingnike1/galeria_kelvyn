import app from "./src/app.js";

const PORT = 3000;

app.listen(PORT, (res, req) => {
    console.log(`Servidor rodando com sucesso, localhost:${PORT}`);
})