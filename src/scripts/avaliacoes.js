const avaliacoesPorPagina = 12;
let paginaAtualAvaliacoes = 1;
let tipoAtual = 'todos';
let todasAvaliacoes = [];

async function carregarAvaliacoes() {
  try {
    const resposta = await fetch('/json/avaliacoes.json'); // Caminho ajustado para Eleventy
    todasAvaliacoes = await resposta.json();
    todasAvaliacoes.sort((a, b) => new Date(b.data) - new Date(a.data));

    renderizarAvaliacoes();
    renderizarPaginacao();
  } catch (erro) {
    console.error("Erro ao carregar avaliacoes.json:", erro);
    document.getElementById('avaliacoes-container').innerHTML = "<p>Não foi possível carregar as avaliações.</p>";
  }
}

function renderizarAvaliacoes() {
  const container = document.getElementById('avaliacoes-container');
  container.innerHTML = '';

  const filtradas = tipoAtual === 'todos'
    ? todasAvaliacoes
    : todasAvaliacoes.filter(a => a.tipo === tipoAtual);

  const inicio = (paginaAtualAvaliacoes - 1) * avaliacoesPorPagina;
  const fim = inicio + avaliacoesPorPagina;
  const avaliacoesPagina = filtradas.slice(inicio, fim);

  avaliacoesPagina.forEach(a => {
    const card = document.createElement('div');
    card.className = 'avaliacao-card';
    card.innerHTML = `
      <img src="${a.imagem}" alt="${a.titulo}">
      <h3>${a.titulo}</h3>
      <p>Nota: ${a.nota}</p>
      <a href="${a.link}" class="read-more">Ler Análise Completa</a>
    `;
    container.appendChild(card);
  });
}

function renderizarPaginacao() {
  const paginacao = document.getElementById('paginacao-avaliacoes');
  paginacao.innerHTML = '';

  const filtradas = tipoAtual === 'todos'
    ? todasAvaliacoes
    : todasAvaliacoes.filter(a => a.tipo === tipoAtual);

  const totalPaginas = Math.ceil(filtradas.length / avaliacoesPorPagina);

  for (let i = 1; i <= totalPaginas; i++) {
    const botao = document.createElement('button');
    botao.textContent = i;
    botao.onclick = () => {
      paginaAtualAvaliacoes = i;
      renderizarAvaliacoes();
      renderizarPaginacao();
    };
    if (i === paginaAtualAvaliacoes) {
      botao.style.fontWeight = 'bold';
    }
    paginacao.appendChild(botao);
  }
}

function filterAvaliacoes(tipo) {
  tipoAtual = tipo;
  paginaAtualAvaliacoes = 1;

  const buttons = document.querySelectorAll('.filter-buttons button');
  buttons.forEach(btn => btn.classList.remove('active'));
  const tipoBotao = Array.from(buttons).find(btn => btn.textContent.toLowerCase().includes(tipo));
  if (tipoBotao) tipoBotao.classList.add('active');

  renderizarAvaliacoes();
  renderizarPaginacao();
}

carregarAvaliacoes();
