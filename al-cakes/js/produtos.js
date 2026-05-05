/* =========================================================
   A&L Cakes - Catálogo de produtos (dados simulados)
   Compartilhado entre cardápio e página de produto.
   ========================================================= */

// Lista de produtos da loja (dados fictícios para o trabalho)
const PRODUTOS = [
  {
id: "bolo-chocolate-mousse-morango",
    nome: "Bolo de Chocolate com Morango",
    descricao: "Massa intensa de chocolate com recheio cremoso de mousse e pedaços de morango.",
    detalhe: "A combinação perfeita entre o amargor do chocolate e a acidez do morango. Possui camadas generosas de mousse de chocolate, morangos frescos picados e finalização com raspas de chocolate ao leite.",
    ingredientes: ["Chocolate meio amargo", "Cacau em pó", "Morangos frescos", "Creme de leite", "Ovos", "Açúcar"],
    preco: 95.00,
    imagem: "images/BoloMousseMorango.jpg"
  },
  {
id: "bolo-ninho-morango",
  nome: "Bolo de Ninho com Morango",
  descricao: "Massa branca aerada com recheio cremoso de Leite Ninho e morangos frescos.",
  detalhe: "Uma combinação suave e sofisticada! Camadas generosas de creme de leite em pó, morangos fatiados e cobertura de chantilly finalizada com raspas abundantes de chocolate branco.",
  ingredientes: ["Farinha de trigo", "Leite em pó integral", "Morangos frescos", "Chocolate branco", "Creme de leite", "Ovos", "Açúcar"],
  preco: 92.00,
  imagem: "images/BoloNinhoMorango.jpg"
  },
  {
    id: "bolo-red-velvet",
    nome: "Bolo Red Velvet",
    descricao: "Massa aveludada de cor vibrante com recheio de cream cheese e geleia artesanal.",
    detalhe: "Um clássico irresistível! Massa leve com toque de cacau, recheada com frosting de cream cheese e uma camada de geleia de frutas vermelhas. Decorado com morango, amora e cereja frescos.",
    ingredientes: ["Farinha de trigo", "Cacau em pó", "Cream cheese", "Morangos", "Amoras", "Cerejas", "Manteiga", "Leitelho"],
    preco: 110.00,
    imagem: "images/BoloRedVelvet.jpg"
  },
  {
    id: "bolo-ninho-nutella",
    nome: "Bolo de Ninho com Nutella",
    descricao: "Massa branca fofinha com dupla camada de recheio: creme de Leite Ninho e Nutella pura.",
    detalhe: "O equilíbrio perfeito entre o sabor suave do leite em pó e a cremosidade marcante do creme de avelã. Finalizado com cobertura de chantilly, calda de chocolate e granulados premium.",
    ingredientes: ["Farinha de trigo", "Leite em pó integral", "Nutella (creme de avelã)", "Ovos caipiras", "Açúcar", "Creme de leite", "Chocolate granulado"],
    preco: 98.00,
    imagem: "images/BoloNutellaNinho.jpg"
  },
  {
    id: "bolo-prestigio",
    nome: "Bolo de Prestígio",
    descricao: "Massa de chocolate úmida com recheio generoso de coco cremoso.",
    detalhe: "O clássico que nunca falha! Massa de cacau intenso recheada com um beijinho artesanal de coco em flocos. Coberto com ganache de chocolate e finalizado com coco ralado e um bombom de coco.",
    ingredientes: ["Farinha de trigo", "Cacau em pó 50%", "Coco ralado em flocos", "Leite condensado", "Leite de coco", "Ovos", "Manteiga"],
    preco: 85.00,
    imagem: "images/BoloPrestigio.jpg"
  },
  {
    id: "bolo-rafaello",
    nome: "Bolo Rafaello",
    descricao: "Massa branca delicada com recheio cremoso de coco e amêndoas crocantes.",
    detalhe: "Inspirado no famoso bombom! Camadas de massa leve umedecidas, recheio de chocolate branco com coco e pedaços de amêndoas torradas. Finalizado com uma camada suave de chantilly, coco ralado e lascas de amêndoas.",
    ingredientes: ["Farinha de trigo", "Chocolate branco", "Amêndoas torradas", "Coco ralado fino", "Leite condensado", "Creme de leite", "Ovos"],
    preco: 105.00,
    imagem: "images/BoloRafaello.jpg"
  },
  {
    id: "bolo-tentacao",
    nome: "Bolo Tentação de Morango",
    descricao: "Massa branca leve com recheio cremoso de doce de leite e morangos frescos.",
    detalhe: "Uma explosão de sabores! Camadas de massa fofinha intercaladas com um irresistível doce de leite artesanal e pedaços de morangos selecionados. Finalizado com cobertura de chantilly e morango no topo.",
    ingredientes: ["Farinha de trigo", "Doce de leite", "Morangos frescos", "Ovos", "Açúcar", "Creme de leite fresco", "Essência de baunilha"],
    preco: 88.00,
    imagem: "images/BoloTentacao.jpg"
  },
  {
    id: "torta-mil-folhas",
    nome: "Torta Mil Folhas",
    descricao: "Camadas crocantes de massa folhada com recheio de creme patissière, doce de leite e morangos.",
    detalhe: "Clássico da confeitaria francesa! Intercala lâminas de massa folhada amanteigada com creme de baunilha suave, uma camada generosa de doce de leite e morangos frescos. Finalizada com açúcar de confeiteiro e frutas no topo.",
    ingredientes: ["Massa folhada artesanal", "Leite integral", "Fava de baunilha", "Doce de leite", "Morangos frescos", "Açúcar de confeiteiro", "Manteiga"],
    preco: 98.50,
    imagem: "images/TortaMilFolhas.jpg"
  }

];

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
function renderizarCardapio() {
  const grid = document.querySelector("#grid-produtos");
  if (!grid) return;

  grid.innerHTML = PRODUTOS.map((p) => `
    <article class="produto-card" data-animar onclick="window.location.href='${LINK_PRODUTO}?id=${p.id}'">
      <img src="${PREFIXO}${p.imagem}" alt="${p.nome}" loading="lazy">
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
function renderizarDestaques() {
  const grid = document.querySelector("#grid-destaques");
  if (!grid) return;

  const destaques = PRODUTOS.slice(0, 4);
  grid.innerHTML = destaques.map((p) => `
    <article class="produto-card" data-animar onclick="window.location.href='${LINK_PRODUTO}?id=${p.id}'">
      <img src="${PREFIXO}${p.imagem}" alt="${p.nome}" loading="lazy">
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
function renderizarProduto() {
  const container = document.querySelector("#detalhe-produto");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const produto = PRODUTOS.find((p) => p.id === id) || PRODUTOS[0];

  // Mensagem padrão para o WhatsApp
  const msgWhats = encodeURIComponent(
    `Olá A&L Cakes! Tenho interesse no produto "${produto.nome}" (R$ ${produto.preco.toFixed(2).replace(".", ",")}). Pode me passar mais informações?`
  );

  document.title = `${produto.nome} - A&L Cakes`;

  container.innerHTML = `
    <div class="produto-detalhe-img" data-animar>
      <img src="${PREFIXO}${produto.imagem}" alt="${produto.nome}">
    </div>
    <div class="produto-detalhe-info" data-animar>
      <h1>${produto.nome}</h1>
      <span class="preco">R$ ${produto.preco.toFixed(2).replace(".", ",")}</span>
      <p>${produto.detalhe}</p>
      <h3>Ingredientes</h3>
      <ul class="ingredientes">
        ${produto.ingredientes.map((i) => `<li>${i}</li>`).join("")}
      </ul>
      <a href="https://wa.me/5511963216219?text=${msgWhats}" target="_blank" rel="noopener" class="btn btn-whatsapp">
        💬 Comprar pelo WhatsApp
      </a>
    </div>
  `;
}

// Executa renderizadores quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  renderizarDestaques();
  renderizarCardapio();
  renderizarProduto();
});
