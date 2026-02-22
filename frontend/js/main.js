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


let fotosCarregadas = [];

async function carregarFotos() {
  try {
    const res = await fetch("/api/fotos");
    const fotos = await res.json();

    const grid = document.getElementById("galeria-grid");

    // filtra só fotos novas
    const novasFotos = fotos.filter(f => 
      !fotosCarregadas.some(old => old._id === f._id)
    );

    if (novasFotos.length === 0) return;

    console.log("🆕 Novas fotos:", novasFotos);

    novasFotos.forEach(foto => {
      const div = document.createElement("div");
      div.className = "group relative overflow-hidden rounded-xl";

      div.innerHTML = `
        <img src="${foto.imageUrl}"
             alt="${foto.titulo}"
             class="w-full h-80 object-cover group-hover:scale-110 transition duration-700 opacity-0">
      `;

      grid.prepend(div);

      // animação suave
      setTimeout(() => {
        div.querySelector("img").classList.remove("opacity-0");
        div.querySelector("img").classList.add("opacity-100");
      }, 100);
    });

    fotosCarregadas = fotos;

  } catch (error) {
    console.log("❌ Erro:", error);
  }
}