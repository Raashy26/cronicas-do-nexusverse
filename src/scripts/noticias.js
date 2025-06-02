const noticiasPorPagina = 12;
let paginaAtualNoticias = 1;
let noticias = [];

async function carregarNoticias() {
  const resposta = await fetch('noticias.json');
  noticias = await resposta.json();

  noticias.sort((a, b) => new Date(b.data) - new Date(a.data));

  renderizarNoticias();
  renderizarPaginacaoNoticias();
}

function renderizarNoticias() {
  const container = document.getElementById('noticias-container');
  container.innerHTML = '';

  const inicio = (paginaAtualNoticias - 1) * noticiasPorPagina;
  const fim = inicio + noticiasPorPagina;
  const noticiasPagina = noticias.slice(inicio, fim);

  noticiasPagina.forEach(noticia => {
    const card = document.createElement('div');
    card.className = 'news-card card';
    card.innerHTML = `
      <img src="${noticia.imagem}" alt="${noticia.titulo}">
      <h3>${noticia.titulo}</h3>
      <a href="${noticia.link}" class="read-more">Ler mais</a>
    `;
    container.appendChild(card);
  });
}

function renderizarPaginacaoNoticias() {
  const paginacao = document.getElementById('paginacao-noticias');
  paginacao.innerHTML = '';

  const totalPaginas = Math.ceil(noticias.length / noticiasPorPagina);

  for (let i = 1; i <= totalPaginas; i++) {
    const botao = document.createElement('button');
    botao.textContent = i;
    botao.className = (i === paginaAtualNoticias) ? 'active' : '';
    botao.onclick = () => {
      paginaAtualNoticias = i;
      renderizarNoticias();
      renderizarPaginacaoNoticias();
    };
    paginacao.appendChild(botao);
  }
}

carregarNoticias();
