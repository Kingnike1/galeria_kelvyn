var API_URL = window.API_URL;

const form = document.getElementById("formUpload");
const successMessage = document.getElementById("successMessage");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Limpar mensagens anteriores
  successMessage.classList.add("hidden");
  errorMessage.classList.add("hidden");

  const formData = new FormData(form);
  const submitBtn = form.querySelector("button[type='submit']");
  const originalText = submitBtn.innerHTML;

  try {
    // Desabilitar botão durante o envio
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split animate-spin"></i> Enviando...';

    const res = await fetch(`${API_URL}/api/fotos`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Erro ao enviar foto");
    }

    // ✅ Sucesso
    console.log("✅ Foto enviada:", data);
    successMessage.classList.remove("hidden");
    form.reset();
    document.getElementById("fileName").textContent = "Clique para selecionar ou arraste aqui";

    // Limpar mensagem de sucesso após 3 segundos
    setTimeout(() => {
      successMessage.classList.add("hidden");
    }, 3000);

  } catch (error) {
    // ❌ Erro
    console.error("❌ Erro:", error);
    errorMessage.textContent = error.message || "Erro ao enviar foto. Tente novamente.";
    errorMessage.classList.remove("hidden");
  } finally {
    // Restaurar botão
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }
});
