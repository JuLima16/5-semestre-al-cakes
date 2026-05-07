$(document).ready(function(){
  listar_bolos();
})

async function listar_bolos() {
  const bolos = await apiCall('/bolos', 'GET');
  console.log(bolos);
  
  // Renderizar os bolos na tela
  renderizarCardapio(bolos);
  renderizarDestaques(bolos);
  renderizarProduto(bolos);
  
  return bolos;
}

/* ---------------------------------------------------------
   Detecta se a página atual está dentro da pasta /pages/
   para ajustar caminhos relativos de imagens e links.
   --------------------------------------------------------- */
const EM_SUBPASTA = window.location.pathname.includes("/pages/");
const PREFIXO = EM_SUBPASTA ? "../" : "";
const LINK_PRODUTO = EM_SUBPASTA ? "produto.html" : "pages/produto.html";

/* ---------------------------------------------------------
   Renderiza a grade de produtos no cardápio
   --------------------------------------------------------- */
function renderizarCardapio(produtos) {
  const grid = document.querySelector("#grid-produtos");
  if (!grid) return;

  grid.innerHTML = produtos.map((p) => `
    <article class="produto-card" data-animar onclick="window.location.href='${LINK_PRODUTO}?id=${p.id}'">
      <img src="${p.imagem}" alt="${p.nome}" loading="lazy">
      <div class="produto-info">
        <h3>${p.nome}</h3>
        <p>${p.descricao}</p>
        <span class="preco">R$ ${p.preco.toFixed(2).replace(".", ",")}</span>
      </div>
    </article>
  `).join("");
}

/* ---------------------------------------------------------
   Renderiza destaques na home (4 produtos)
   --------------------------------------------------------- */
function renderizarDestaques(produtos) {
  const grid = document.querySelector("#grid-destaques");
  if (!grid) return;

  const destaques = produtos.slice(0, 4);
  grid.innerHTML = destaques.map((p) => `
    <article class="produto-card" data-animar onclick="window.location.href='${LINK_PRODUTO}?id=${p.id}'">
      <img src="${p.imagem}" alt="${p.nome}" loading="lazy">
      <div class="produto-info">
        <h3>${p.nome}</h3>
        <p>${p.descricao}</p>
        <span class="preco">R$ ${p.preco.toFixed(2).replace(".", ",")}</span>
      </div>
    </article>
  `).join("");
}

/* ---------------------------------------------------------
   Renderiza a página individual do produto
   Lê o ?id=... da URL
   --------------------------------------------------------- */
function renderizarProduto(produtos) {
  const container = document.querySelector("#detalhe-produto");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const produto = produtos.find((p) => p.id === id) || produtos[0];

  // Mensagem padrão para o WhatsApp
  const msgWhats = encodeURIComponent(
    'Olá A&L Cakes! Tenho interesse no produto "${produto.nome}" (R$ ${produto.preco.toFixed(2).replace(".", ",")}). Pode me passar mais informações?'
  );

  document.title = `${produto.nome} - A&L Cakes`;

  container.innerHTML = `
    <div class="produto-detalhe-img" data-animar>
      <img src="${produto.imagem}" alt="${produto.nome}">
    </div>
    <div class="produto-detalhe-info" data-animar>
      <h1>${produto.nome}</h1>
      <span class="preco">R$ ${produto.preco.toFixed(2).replace(".", ",")}</span>
      <p>${produto.descricao}</p>
      <a href="https://wa.me/5511963216219?text=${msgWhats}" target="_blank" rel="noopener" class="btn btn-whatsapp">
        💬 Comprar pelo WhatsApp
      </a>
    </div>
  `;
}