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