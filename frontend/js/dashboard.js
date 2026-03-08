document.addEventListener("DOMContentLoaded", () => {
    const API_URL = window.location.origin;

    // verificar se usuário está logado
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "/login";
}

    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        window.location.href = "/login";
    });

    async function carregarDashboard() {
        try {
            const [fotosRes, usuariosRes] = await Promise.all([
                fetch(`${API_URL}/api/fotos`, { headers: { "Authorization": `Bearer ${token}` } }),
                fetch(`${API_URL}/api/users`, { headers: { "Authorization": `Bearer ${token}` } })
            ]);

            if (fotosRes.status === 401 || usuariosRes.status === 401) {
                window.location.href = "/login";
                return;
            }

            const fotos = await fotosRes.json();
            const usuarios = await usuariosRes.json();

            document.getElementById("total-fotos").textContent = fotos.length;
            document.getElementById("total-usuarios").textContent = usuarios.length;

            const galeriaGrid = document.getElementById("galeria-grid");
            galeriaGrid.innerHTML = ""; // Limpa a galeria

            fotos.forEach(foto => {
                const card = document.createElement("div");
                card.className = "bg-zinc-900 rounded-lg overflow-hidden group relative";

                const user = foto.uploadedBy ? `${foto.uploadedBy.nome || 'Desconhecido'} (${foto.uploadedBy.email})` : 'Usuário desconhecido';

                card.innerHTML = `
                    <img src="${foto.imageUrl}" alt="${foto.titulo}" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <h3 class="font-bold">${foto.titulo}</h3>
                        <p class="text-sm text-gray-400">Enviado por: ${user}</p>
                        <button class="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity delete-btn" data-id="${foto._id}">X</button>
                    </div>
                `;
                galeriaGrid.appendChild(card);
            });

            document.getElementById("loadingMessage").classList.add("hidden");

            // Adiciona eventos de clique para os botões de deletar
            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', async (e) => {
                    const id = e.target.getAttribute('data-id');
                    if (confirm('Tem certeza que deseja excluir esta foto?')) {
                        const res = await fetch(`${API_URL}/api/fotos/${id}`, {
                            method: 'DELETE',
                            headers: { "Authorization": `Bearer ${token}` }
                        });

                        if (res.ok) {
                            carregarDashboard(); // Recarrega o dashboard
                        } else {
                            const error = await res.json();
                            alert(`Erro ao excluir foto: ${error.error}`);
                        }
                    }
                });
            });

        } catch (error) {
            console.error("Erro ao carregar o dashboard:", error);
            document.getElementById("loadingMessage").textContent = "Erro ao carregar dados.";
        }
    }

    carregarDashboard();
});
