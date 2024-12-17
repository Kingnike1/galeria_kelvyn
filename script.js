 // Alternar Tema Claro/Escuro
 const themeToggle = document.getElementById('themeToggle');
 themeToggle.addEventListener('click', () => {
     document.body.classList.toggle('dark-mode');
     // Salvar a preferência do tema no localStorage
     if (document.body.classList.contains('dark-mode')) {
         localStorage.setItem('theme', 'dark');
     } else {
         localStorage.setItem('theme', 'light');
     }
 });

 // Verificar preferência salva no localStorage
 document.addEventListener('DOMContentLoaded', () => {
     const savedTheme = localStorage.getItem('theme');
     if (savedTheme === 'dark') {
         document.body.classList.add('dark-mode');
     }
 });