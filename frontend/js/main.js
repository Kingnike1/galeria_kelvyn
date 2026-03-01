const form = document.getElementById("formUpload");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const res = await fetch("/api/fotos", {
    method: "POST",
    body: formData
  });

  const data = await res.json();

  console.log("✅ Foto enviada:", data);
});


async function carregarFotos() {
  try {
    const [resAPI, resLocal] = await Promise.all([
      fetch("/api/fotos"),
      fetch("/api/fotos-locais")
    ]);

    const fotosAPI = await resAPI.json();
    const fotosLocais = await resLocal.json();

    const fotos = [...fotosLocais, ...fotosAPI];

    const grid = document.getElementById("galeria-grid");

    const novasFotos = fotos.filter(f => 
      !fotosCarregadas.some(old => old._id === f._id)
    );

    if (novasFotos.length === 0) {
      if (fotosCarregadas.length === 0) {
        grid.innerHTML = '<p class="col-span-full text-center text-gray-500">Nenhuma foto disponível</p>';
      }
      return;
    }

    novasFotos.forEach(foto => {
      const div = document.createElement("div");
      div.className = "group relative overflow-hidden rounded-xl";

      div.innerHTML = `
        <img src="${foto.imageUrl}"
             alt="${foto.titulo}"
             loading="lazy"
             class="w-full h-80 object-cover group-hover:scale-110 transition duration-700 opacity-0">
      `;

      grid.prepend(div);

      setTimeout(() => {
        const img = div.querySelector("img");
        img.classList.remove("opacity-0");
        img.classList.add("opacity-100");
      }, 100);
    });

    fotosCarregadas = fotos;

  } catch (error) {
    console.log("❌ Erro:", error);
  }
}