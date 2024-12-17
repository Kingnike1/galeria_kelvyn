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

// Função para carregar os comentários armazenados
function carregarComentarios() {
    const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
    const comentariosContainer = document.getElementById('comentarios');
    comentariosContainer.innerHTML = ''; // Limpar a área de comentários

    comentarios.forEach(comentario => {
        const divComentario = document.createElement('div');
        divComentario.classList.add('comentario');
        divComentario.textContent = comentario;
        comentariosContainer.appendChild(divComentario);
    });
}

// Função para adicionar um novo comentário
function adicionarComentario() {
    const novoComentario = document.getElementById('novoComentario').value;
    if (novoComentario.trim() !== '') {
        const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
        comentarios.push(novoComentario);
        localStorage.setItem('comentarios', JSON.stringify(comentarios));
        document.getElementById('novoComentario').value = ''; // Limpar o campo de entrada
        carregarComentarios(); // Recarregar os comentários
    }
}

// Carregar os comentários quando a página for carregada
document.addEventListener('DOMContentLoaded', carregarComentarios);


        // Defina o shortname do seu fórum
        var disqus_shortname = 'galeria-4';  // Substitua com o seu shortname

        // Função de configuração
        var disqus_config = function () {
            this.page.url = window.location.href;  // A URL da página
            this.page.identifier = 'unique-page-id';  // Identificador único para cada página/foto
        };

        (function () {  // Adiciona o script do Disqus
            var s = document.createElement('script');
            s.src = 'https://' + disqus_shortname + '.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (document.head || document.body).appendChild(s);
        })();