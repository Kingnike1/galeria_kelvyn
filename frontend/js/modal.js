// 🖼️ Modal de visualização de imagens estilo Instagram

function criarModal() {
  // Verificar se o modal já existe
  if (document.getElementById("imagemModal")) {
    return;
  }

  const modal = document.createElement("div");
  modal.id = "imagemModal";
  modal.className = "fixed inset-0 z-50 hidden";
  
  modal.innerHTML = `
    <!-- Fundo com blur -->
    <div id="modalBackdrop" class="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 transition-opacity duration-300"></div>
    
    <!-- Container da imagem -->
    <div class="absolute inset-0 flex items-center justify-center p-4">
      <div id="modalContent" class="relative max-w-4xl w-full h-auto transform scale-95 opacity-0 transition-all duration-300">
        <!-- Imagem -->
        <img id="modalImage" src="" alt="Imagem ampliada" class="w-full h-auto rounded-lg shadow-2xl">
        
        <!-- Botão de fechar (X) -->
        <button id="closeModalBtn" class="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300 transition duration-200 focus:outline-none">
          ✕
        </button>
        
        <!-- Informações da imagem -->
        <div id="modalInfo" class="mt-4 text-center text-white">
          <h3 id="modalTitle" class="text-lg font-semibold"></h3>
          <p id="modalAuthor" class="text-sm text-gray-300 mt-2"></p>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Elementos do modal
  const backdrop = document.getElementById("modalBackdrop");
  const content = document.getElementById("modalContent");
  const closeBtn = document.getElementById("closeModalBtn");

  // Função para abrir modal
  window.abrirModal = function(imagemSrc, titulo, autor) {
    const modal = document.getElementById("imagemModal");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalAuthor = document.getElementById("modalAuthor");

    modalImage.src = imagemSrc;
    modalTitle.textContent = titulo || "Foto";
    modalAuthor.textContent = autor || "";

    // Mostrar modal
    modal.classList.remove("hidden");
    
    // Forçar reflow para ativar transição
    setTimeout(() => {
      backdrop.classList.add("opacity-100");
      content.classList.add("scale-100", "opacity-100");
      content.classList.remove("scale-95", "opacity-0");
    }, 10);
  };

  // Função para fechar modal
  function fecharModal() {
    backdrop.classList.remove("opacity-100");
    content.classList.remove("scale-100", "opacity-100");
    content.classList.add("scale-95", "opacity-0");

    setTimeout(() => {
      modal.classList.add("hidden");
    }, 300);
  }

  // Listeners para fechar modal
  closeBtn.addEventListener("click", fecharModal);
  backdrop.addEventListener("click", fecharModal);

  // Fechar com tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !document.getElementById("imagemModal").classList.contains("hidden")) {
      fecharModal();
    }
  });
}

// Inicializar modal ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  criarModal();
});

// Exportar função
window.criarModal = criarModal;
