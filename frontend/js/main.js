const form = document.getElementById("formFoto");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const imageUrl = document.getElementById("imageUrl").value;

  console.log("📤 Enviando:", { titulo, imageUrl });

  try {
    const response = await fetch("http://localhost:3000/api/photos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        titulo,
        imageUrl
      })
    });

    const data = await response.json();

    console.log("✅ Salvo no banco:", data);

    alert("Foto salva com sucesso!");

  } catch (error) {
    console.log("❌ Erro:", error);
  }
});