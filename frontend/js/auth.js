// 🔐 Gerenciar autenticação e exibição de elementos baseado em role

const API_URL = window.API_URL;
// Função para atualizar a UI baseado no role do usuário
function atualizarUIBaseadoEmRole() {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const token = localStorage.getItem("token");
  
  const userMenuDesktop = document.getElementById("userMenuDesktop");
  const userMenuMobile = document.getElementById("userMenuMobile");
  const loginBtnDesktop = document.getElementById("loginBtnDesktop");
  const loginBtnMobile = document.getElementById("loginBtnMobile");
  const userEmailDesktop = document.getElementById("userEmailDesktop");
  const userEmailMobile = document.getElementById("userEmailMobile");
  
  if (token && usuario._id) {
    // Usuário está logado
    if (userMenuDesktop) userMenuDesktop.classList.remove("hidden");
    if (userMenuMobile) userMenuMobile.classList.remove("hidden");
    if (loginBtnDesktop) loginBtnDesktop.classList.add("hidden");
    if (loginBtnMobile) loginBtnMobile.classList.add("hidden");
    
    if (userEmailDesktop) userEmailDesktop.textContent = usuario.email;
    if (userEmailMobile) userEmailMobile.textContent = usuario.email;
    
    // Mostrar links de admin apenas se o usuário for admin
    const formularioLink = document.getElementById("formularioLink");
    const dashboardLink = document.getElementById("dashboardLink");
    const formularioLinkMobile = document.getElementById("formularioLinkMobile");
    const dashboardLinkMobile = document.getElementById("dashboardLinkMobile");
    
    if (usuario.role === "admin") {
      if (formularioLink) formularioLink.classList.remove("hidden");
      if (dashboardLink) dashboardLink.classList.remove("hidden");
      if (formularioLinkMobile) formularioLinkMobile.classList.remove("hidden");
      if (dashboardLinkMobile) dashboardLinkMobile.classList.remove("hidden");
    } else {
      if (formularioLink) formularioLink.classList.add("hidden");
      if (dashboardLink) dashboardLink.classList.add("hidden");
      if (formularioLinkMobile) formularioLinkMobile.classList.add("hidden");
      if (dashboardLinkMobile) dashboardLinkMobile.classList.add("hidden");
    }
  } else {
    // Usuário não está logado
    if (userMenuDesktop) userMenuDesktop.classList.add("hidden");
    if (userMenuMobile) userMenuMobile.classList.add("hidden");
    if (loginBtnDesktop) loginBtnDesktop.classList.remove("hidden");
    if (loginBtnMobile) loginBtnMobile.classList.remove("hidden");
    
    const formularioLink = document.getElementById("formularioLink");
    const dashboardLink = document.getElementById("dashboardLink");
    const formularioLinkMobile = document.getElementById("formularioLinkMobile");
    const dashboardLinkMobile = document.getElementById("dashboardLinkMobile");
    if (formularioLink) formularioLink.classList.add("hidden");
    if (dashboardLink) dashboardLink.classList.add("hidden");
    if (formularioLinkMobile) formularioLinkMobile.classList.add("hidden");
    if (dashboardLinkMobile) dashboardLinkMobile.classList.add("hidden");
  }
}

// Função para fazer logout
function fazerLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  window.location.href = "/";
}

// Executar ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  atualizarUIBaseadoEmRole();
  
  // Adicionar listeners aos botões de logout
  const logoutBtnDesktop = document.getElementById("logoutBtnDesktop");
  const logoutBtnMobile = document.getElementById("logoutBtnMobile");
  
  if (logoutBtnDesktop) {
    logoutBtnDesktop.addEventListener("click", fazerLogout);
  }
  
  if (logoutBtnMobile) {
    logoutBtnMobile.addEventListener("click", fazerLogout);
  }
});

// Exportar funções para uso em outros scripts
window.atualizarUIBaseadoEmRole = atualizarUIBaseadoEmRole;
window.fazerLogout = fazerLogout;
