// 🎯 Scroll suave para links de navegação

document.addEventListener("DOMContentLoaded", () => {
  // Selecionar todos os links que começam com #
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      // Ignorar links vazios
      if (href === "#") {
        return;
      }

      e.preventDefault();

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Calcular a posição do elemento
        const targetPosition = targetElement.offsetTop;
        const headerHeight = document.querySelector("header").offsetHeight;
        const scrollPosition = targetPosition - headerHeight;

        // Scroll suave
        window.scrollTo({
          top: scrollPosition,
          behavior: "smooth"
        });

        // Fechar menu mobile se estiver aberto
        const mobileMenu = document.getElementById("mobileMenu");
        if (mobileMenu && mobileMenu.classList.contains("active")) {
          mobileMenu.classList.remove("active");
          document.getElementById("menuToggle").classList.remove("active");
        }
      }
    });
  });

  // Também adicionar scroll suave via CSS
  document.documentElement.style.scrollBehavior = "smooth";
});
