async function carregarConteudoInicial() {
  // Carrega e ordena artigos
  const respostaArtigos = await fetch('artigos.json');
  const artigos = await respostaArtigos.json();
  artigos.sort((a, b) => new Date(b.data) - new Date(a.data));
  const artigosRecentes = artigos.slice(0, 10);

  // Renderiza artigos em destaque
  const destaqueContainer = document.getElementById('destaque-artigos');
  artigosRecentes.forEach(artigo => {
    const card = document.createElement('div');
    card.className = 'destaque-card';
    card.innerHTML = `
      <a href="${artigo.link}">
        <img src="${artigo.imagem}" alt="${artigo.titulo}">
      </a>
      <p><strong>${artigo.titulo}</strong></p>
    `;
    destaqueContainer.appendChild(card);
  });

  // Carrega e ordena notícias
  const respostaNoticias = await fetch('noticias.json');
  const noticias = await respostaNoticias.json();
  noticias.sort((a, b) => new Date(b.data) - new Date(a.data));
  const noticiasRecentes = noticias.slice(0, 3);

  // Renderiza notícias
  const noticiasContainer = document.getElementById('ultimas-noticias');
  noticiasRecentes.forEach(noticia => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${noticia.imagem}" alt="${noticia.titulo}">
      <h3>${noticia.titulo}</h3>
      <a href="${noticia.link}" class="read-more">Ler mais</a>
    `;
    noticiasContainer.appendChild(card);
  });
}

carregarConteudoInicial();
