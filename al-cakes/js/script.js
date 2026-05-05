/* =========================================================
   A&L Cakes - JavaScript principal
   Funcionalidades:
   - Menu hambúrguer responsivo
   - Marca link ativo na navbar
   - Animações de entrada (scroll reveal)
   - Validação dos formulários (login, cadastro, admin)
   - Pré-visualização do cadastro de produto
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  ativarMenuMobile();
  marcarLinkAtivo();
  animarAoRolar();
  configurarFormularios();
});

/* ---------------------------------------------------------
   MENU MOBILE - abre/fecha ao clicar no hambúrguer
   --------------------------------------------------------- */
function ativarMenuMobile() {
  const btn = document.querySelector(".hamburguer");
  const menu = document.querySelector(".nav-menu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    menu.classList.toggle("aberto");
  });

  // Fecha o menu ao clicar em um link (no mobile)
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => menu.classList.remove("aberto"));
  });
}

/* ---------------------------------------------------------
   LINK ATIVO - destaca o item da navbar da página atual
   --------------------------------------------------------- */
function marcarLinkAtivo() {
  // Pega só o nome do arquivo (ex: cardapio.html)
  const arquivo = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    const href = link.getAttribute("href").split("/").pop();
    if (href === arquivo) link.classList.add("ativo");
  });
}

/* ---------------------------------------------------------
   ANIMAÇÃO AO ROLAR - usa IntersectionObserver
   Elementos com [data-animar] aparecem ao entrar na viewport
   --------------------------------------------------------- */
function animarAoRolar() {
  const alvos = document.querySelectorAll("[data-animar]");
  if (!alvos.length) return;

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.style.opacity = "1";
          entrada.target.style.transform = "translateY(0)";
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  alvos.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
    observador.observe(el);
    // Fallback: garante visibilidade após 1.5s caso o observer não dispare
    setTimeout(() => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }, 1500);
  });
}

/* ---------------------------------------------------------
   FORMULÁRIOS - validação básica e mensagens
   --------------------------------------------------------- */
function configurarFormularios() {
  configurarLogin();
  configurarCadastro();
  configurarAdmin();
}

/* Mostra mensagem dentro de uma div com classe .mensagem */
function exibirMensagem(form, texto, tipo = "sucesso") {
  let msg = form.querySelector(".mensagem");
  if (!msg) {
    msg = document.createElement("div");
    msg.classList.add("mensagem");
    form.appendChild(msg);
  }
  msg.className = "mensagem " + tipo;
  msg.textContent = texto;
}

/* ---- LOGIN ---- */
function configurarLogin() {
  const form = document.querySelector("#form-login");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    const senha = form.senha.value.trim();

    // Validações simples
    if (!validarEmail(email)) {
      return exibirMensagem(form, "Por favor, informe um email válido.", "erro");
    }
    if (senha.length < 6) {
      return exibirMensagem(form, "A senha deve ter pelo menos 6 caracteres.", "erro");
    }

    exibirMensagem(form, "Login realizado com sucesso! 🎂", "sucesso");
    form.reset();
  });
}

/* ---- CADASTRO DE CLIENTE ---- */
function configurarCadastro() {
  const form = document.querySelector("#form-cadastro");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const senha = form.senha.value.trim();

    if (nome.length < 3) {
      return exibirMensagem(form, "Informe seu nome completo.", "erro");
    }
    if (!validarEmail(email)) {
      return exibirMensagem(form, "Email inválido.", "erro");
    }
    if (senha.length < 6) {
      return exibirMensagem(form, "A senha deve ter pelo menos 6 caracteres.", "erro");
    }

    exibirMensagem(form, `Bem-vinda(o), ${nome}! Cadastro realizado. 🌸`, "sucesso");
    form.reset();
  });
}

/* ---- ADMIN: cadastro de produto + preview ---- */
function configurarAdmin() {
  const form = document.querySelector("#form-admin");
  if (!form) return;

  const preview = document.querySelector("#preview-produto");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = form.nome.value.trim();
    const descricao = form.descricao.value.trim();
    const preco = parseFloat(form.preco.value);
    const imagem = form.imagem.value.trim();

    if (!nome || !descricao || isNaN(preco) || preco <= 0) {
      return exibirMensagem(form, "Preencha todos os campos corretamente.", "erro");
    }

    // Monta a pré-visualização (apenas visual - nada é salvo)
    if (preview) {
      preview.innerHTML = `
        <h3>Pré-visualização do produto</h3>
        ${imagem ? `<img src="${imagem}" alt="${nome}" onerror="this.style.display='none'" style="width:100%;max-height:240px;object-fit:cover;border-radius:10px;margin:1rem 0;">` : ""}
        <h4 style="font-family:var(--fonte-titulo);font-size:1.3rem;">${nome}</h4>
        <p style="color:var(--texto-claro);margin:0.4rem 0;">${descricao}</p>
        <span class="preco">R$ ${preco.toFixed(2).replace(".", ",")}</span>
      `;
      preview.classList.add("ativo");
    }

    exibirMensagem(form, "Produto cadastrado (simulação) com sucesso!", "sucesso");
  });
}

/* ---- Utilitário: valida formato de email ---- */
function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
