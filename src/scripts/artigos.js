const artigosPorPagina = 12;
let paginaAtual = 1;
let artigos = [];

async function carregarArtigos() {
  try {
    const resposta = await fetch('/json/artigos.json'); // Caminho relativo a partir da raiz do site
    artigos = await resposta.json();

    artigos.sort((a, b) => new Date(b.data) - new Date(a.data));

    renderizarArtigos();
    renderizarPaginacao();
  } catch (erro) {
    console.error("Erro ao carregar artigos.json:", erro);
    document.getElementById('artigos-container').innerHTML = "<p>Não foi possível carregar os artigos.</p>";
  }
}

function renderizarArtigos() {
  const container = document.getElementById('artigos-container');
  container.innerHTML = '';

  const inicio = (paginaAtual - 1) * artigosPorPagina;
  const fim = inicio + artigosPorPagina;
  const artigosPagina = artigos.slice(inicio, fim);

  artigosPagina.forEach(artigo => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${artigo.imagem}" alt="${artigo.titulo}">
      <h3>${artigo.titulo}</h3>
      <a href="${artigo.link}" class="read-more">Leia Mais</a>
    `;
    container.appendChild(card);
  });
}

function renderizarPaginacao() {
  const paginacao = document.getElementById('paginacao');
  paginacao.innerHTML = '';

  const totalPaginas = Math.ceil(artigos.length / artigosPorPagina);

  for (let i = 1; i <= totalPaginas; i++) {
    const botao = document.createElement('button');
    botao.textContent = i;
    botao.className = (i === paginaAtual) ? 'active' : '';
    botao.onclick = () => {
      paginaAtual = i;
      renderizarArtigos();
      renderizarPaginacao();
    };
    paginacao.appendChild(botao);
  }
}

carregarArtigos();
