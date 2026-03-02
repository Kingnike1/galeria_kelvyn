let fotosCarregadas = [];

async function carregarFotos() {
  try {
    const loadingMessage = document.getElementById("loadingMessage");
    const grid = document.getElementById("galeria-grid");

    // Tentar carregar fotos da API
    let fotos = [];

    try {
      const resAPI = await fetch("http://localhost:3000/api/fotos");
      if (resAPI.ok) {
        const fotosAPI = await resAPI.json();
        fotos = [...fotos, ...fotosAPI];
      }
    } catch (error) {
      console.warn("⚠️ Erro ao carregar fotos da API:", error);
    }

    // Carregar fotos locais
    try {
      const resLocal = await fetch("http://localhost:3000/api/fotos-locais");
      if (resLocal.ok) {
        const fotosLocais = await resLocal.json();
        fotos = [...fotos, ...fotosLocais];
      }
    } catch (error) {
      console.warn("⚠️ Erro ao carregar fotos locais:", error);
    }

    // Remover duplicatas
    fotos = fotos.filter((foto, index, self) =>
      index === self.findIndex((f) => f._id === foto._id)
    );

    // Filtrar novas fotos
    const novasFotos = fotos.filter(f => 
      !fotosCarregadas.some(old => old._id === f._id)
    );

    if (novasFotos.length === 0) {
      if (fotosCarregadas.length === 0) {
        grid.innerHTML = '<p class="col-span-full text-center text-gray-500 py-10">Nenhuma foto disponível</p>';
      }
      loadingMessage.classList.add("hidden");
      return;
    }

    // Renderizar novas fotos
    novasFotos.forEach(foto => {
      const div = document.createElement("div");
      div.className = "group relative overflow-hidden rounded-xl aspect-square";

      div.innerHTML = `
        <img src="${foto.imageUrl}"
             alt="${foto.titulo || 'Foto'}"
             loading="lazy"
             class="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-0">
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-300"></div>
      `;

      grid.prepend(div);

      // Animar entrada da foto
      setTimeout(() => {
        const img = div.querySelector("img");
        img.classList.remove("opacity-0");
        img.classList.add("opacity-100", "transition-opacity", "duration-500");
      }, 100);
    });

    fotosCarregadas = fotos;
    loadingMessage.classList.add("hidden");

  } catch (error) {
    console.error("❌ Erro geral:", error);
    const grid = document.getElementById("galeria-grid");
    grid.innerHTML = '<p class="col-span-full text-center text-red-500 py-10">Erro ao carregar fotos</p>';
  }
}

// Carregar fotos ao iniciar
document.addEventListener("DOMContentLoaded", () => {
  carregarFotos();
  
  // Recarregar fotos a cada 30 segundos
  setInterval(carregarFotos, 30000);
});
