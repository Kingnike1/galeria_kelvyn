// 🔄 Gerenciar abas
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tabName = btn.getAttribute("data-tab");

    // Remover classes ativas
    tabBtns.forEach((b) => {
      b.classList.remove("bg-white", "text-black");
      b.classList.add("bg-zinc-800", "text-white");
    });

    tabContents.forEach((content) => {
      content.classList.add("hidden");
      content.classList.remove("active");
    });

    // Adicionar classes ativas
    btn.classList.remove("bg-zinc-800", "text-white");
    btn.classList.add("bg-white", "text-black");

    document.getElementById(`form${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`).classList.remove("hidden");
    document.getElementById(`form${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`).classList.add("active");
  });
});

// 🔐 Formulário de Login
const formLogin = document.getElementById("formLogin");
const loginError = document.getElementById("loginError");

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const senha = document.getElementById("loginSenha").value;

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (!response.ok) {
      loginError.textContent = data.error || "Erro ao fazer login";
      loginError.classList.remove("hidden");
      return;
    }

    // ✅ Salvar token no localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));

    // 🎉 Redirecionar para home
    window.location.href = "/";

  } catch (error) {
    console.error("Erro:", error);
    loginError.textContent = "Erro de conexão com o servidor";
    loginError.classList.remove("hidden");
  }
});

// 📝 Formulário de Registro
const formRegistro = document.getElementById("formRegistro");
const registroError = document.getElementById("registroError");

formRegistro.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("registroEmail").value;
  const senha = document.getElementById("registroSenha").value;
  const senhaConfirm = document.getElementById("registroSenhaConfirm").value;

  // Validar senhas
  if (senha !== senhaConfirm) {
    registroError.textContent = "As senhas não correspondem";
    registroError.classList.remove("hidden");
    return;
  }

  try {
    const response = await fetch("/api/registro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (!response.ok) {
      registroError.textContent = data.error || "Erro ao criar conta";
      registroError.classList.remove("hidden");
      return;
    }

    // ✅ Conta criada com sucesso
    registroError.classList.add("hidden");
    alert("✅ Conta criada com sucesso! Faça login agora.");

    // Limpar formulário
    formRegistro.reset();

    // Voltar para aba de login
    document.getElementById("btnLogin").click();

  } catch (error) {
    console.error("Erro:", error);
    registroError.textContent = "Erro de conexão com o servidor";
    registroError.classList.remove("hidden");
  }
});
