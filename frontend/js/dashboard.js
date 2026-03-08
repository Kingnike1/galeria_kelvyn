document.addEventListener("DOMContentLoaded", () => {
    var API_URL = window.API_URL || window.location.origin;

    // 🔐 Verificar se usuário está logado e é administrador
    const token = localStorage.getItem("token");
    const usuarioStr = localStorage.getItem("usuario");
    const usuario = usuarioStr ? JSON.parse(usuarioStr) : null;

    if (!token || !usuario) {
        window.location.href = "/login";
        return;
    }

    // Se não é administrador, redirecionar para home
    if (usuario.role !== "admin") {
        window.location.href = "/";
        return;
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
                fetch(`${API_URL}/api/fotos`, { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } }),
                fetch(`${API_URL}/api/users`, { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } })
            ]);

            if (fotosRes.status === 401 || usuariosRes.status === 401) {
                window.location.href = "/login";
                return;
            }

            const fotos = await fotosRes.json();
            const usuarios = await usuariosRes.json();

            document.getElementById("total-fotos").textContent = fotos.length;
            document.getElementById("total-usuarios").textContent = usuarios.length;

            // 📸 Renderizar galeria de fotos
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

            // 👥 Renderizar tabela de usuários
            const usuariosTable = document.getElementById("usuarios-table");
            if (usuariosTable) {
                usuariosTable.innerHTML = ""; // Limpa a tabela

                usuarios.forEach(u => {
                    const row = document.createElement("tr");
                    row.className = "border-b border-zinc-700 hover:bg-zinc-800/50 transition";
                    
                    const roleClass = u.role === "admin" ? "bg-yellow-600/20 text-yellow-400" : "bg-blue-600/20 text-blue-400";
                    
                    row.innerHTML = `
                        <td class="px-6 py-4">${u.email}</td>
                        <td class="px-6 py-4">${u.nome || 'N/A'}</td>
                        <td class="px-6 py-4">
                            <span class="px-3 py-1 rounded-full text-sm ${roleClass}">
                                ${u.role === "admin" ? "👑 Admin" : "👤 Usuário"}
                            </span>
                        </td>
                        <td class="px-6 py-4">
                            <button class="change-role-btn px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm transition" data-id="${u._id}" data-role="${u.role}">
                                ${u.role === "admin" ? "Remover Admin" : "Tornar Admin"}
                            </button>
                        </td>
                    `;
                    usuariosTable.appendChild(row);
                });
            }

            document.getElementById("loadingMessage").classList.add("hidden");

            // Adiciona eventos de clique para os botões de deletar fotos
            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', async (e) => {
                    const id = e.target.getAttribute('data-id');
                    if (confirm('Tem certeza que deseja excluir esta foto?')) {
                        const res = await fetch(`${API_URL}/api/fotos/${id}`, {
                            method: 'DELETE',
                            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
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

            // Adiciona eventos de clique para os botões de alterar role
            document.querySelectorAll('.change-role-btn').forEach(button => {
                button.addEventListener('click', async (e) => {
                    const userId = e.target.getAttribute('data-id');
                    const currentRole = e.target.getAttribute('data-role');
                    const newRole = currentRole === "admin" ? "user" : "admin";
                    
                    if (confirm(`Tem certeza que deseja ${newRole === "admin" ? "tornar este usuário administrador" : "remover permissões de administrador"}?`)) {
                        try {
                            const res = await fetch(`${API_URL}/api/users/${userId}/role`, {
                                method: 'PUT',
                                headers: {
                                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({ role: newRole })
                            });

                            if (res.ok) {
                                alert(`Usuário ${newRole === "admin" ? "promovido a administrador" : "removido de administrador"} com sucesso!`);
                                carregarDashboard(); // Recarrega o dashboard
                            } else {
                                const error = await res.json();
                                alert(`Erro ao alterar role: ${error.error}`);
                            }
                        } catch (error) {
                            console.error("Erro:", error);
                            alert("Erro ao alterar role do usuário");
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
