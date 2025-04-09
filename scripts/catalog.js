// Elementos principais
const selectBairro = document.getElementById("select-bairro");
const selectCategoria = document.getElementById("select-categoria");
const imoveisBoxes = document.querySelectorAll(".imoveis-box");

// Numeração dos cards
imoveisBoxes.forEach((element, index) => {
  element.setAttribute("data-id", index + 1);
});

// Preenchimento da categoria nos cards
document.querySelectorAll(".categoria").forEach((element) => {
  const categoria = element
    .closest("[data-categoria]")
    .getAttribute("data-categoria");
  element.innerHTML = categoria;
});

// Preenchimento do bairro nos cards
document.querySelectorAll(".nome-bairro").forEach((element) => {
  const elementoBairro = element
    .closest("[data-bairro]")
    .getAttribute("data-bairro");
  element.innerHTML = `Bairro ${elementoBairro}`;
});

// Preenchimento da quantidade de quartos nos cards
document.querySelectorAll(".qtd-quartos").forEach((element) => {
  const qtdQuartos = element
    .closest("[data-quartos]")
    .getAttribute("data-quartos");

  element.innerHTML = `• ${qtdQuartos} ${
    qtdQuartos == 1 ? "quarto" : "quartos"
  }`;
});

// Preenchimento da quantidade de banheiros nos cards
document.querySelectorAll(".qtd-banheiros").forEach((element) => {
  const qtdBanheiros = element
    .closest("[data-banheiros]")
    .getAttribute("data-banheiros");

  element.innerHTML = `• ${qtdBanheiros} ${
    qtdBanheiros == 1 ? "banheiro" : "banheiros"
  }`;
});

// Preenchimento do valor do imóvel nos cards
document.querySelectorAll(".valor").forEach((element) => {
  const valorImovel = element
    .closest("[data-valor]")
    .getAttribute("data-valor");

  element.innerHTML = `R$ ${valorImovel}`;
});

// Criação das opções de bairro no select
const createSelect = () => {
  const bairrosDisponiveis = new Set();

  imoveisBoxes.forEach((element) => {
    let dataBairro = element.getAttribute("data-bairro");
    bairrosDisponiveis.add(dataBairro);
  });

  bairrosDisponiveis.forEach((bairro) => {
    const option = document.createElement("option");
    option.value = bairro;
    option.textContent = bairro;
    selectBairro.appendChild(option);
  });
};

createSelect();

// Atualização das categorias com base no bairro selecionado
const updateCategories = () => {
  const categoriasDisponiveis = new Set();

  imoveisBoxes.forEach((element) => {
    let dataBairro = element.getAttribute("data-bairro");
    let dataCategoria = element.getAttribute("data-categoria");

    if (selectBairro.value === "Todos" || selectBairro.value === dataBairro) {
      categoriasDisponiveis.add(dataCategoria);
    }
  });

  Array.from(selectCategoria.options).forEach((option) => {
    option.disabled = !(
      option.value === "Todos" || categoriasDisponiveis.has(option.value)
    );
  });

  if (selectCategoria.options[selectCategoria.selectedIndex].disabled) {
    selectCategoria.value = "Todos";
  }
};

// Aplicação dos filtros
const applyFilters = () => {
  updateCategories();

  imoveisBoxes.forEach((element) => {
    let dataBairro = element.getAttribute("data-bairro");
    let dataCategoria = element.getAttribute("data-categoria");

    let bairroMatch =
      selectBairro.value === "Todos" || selectBairro.value === dataBairro;
    let categoriaMatch =
      selectCategoria.value === "Todos" ||
      selectCategoria.value === dataCategoria;

    element.style.display = bairroMatch && categoriaMatch ? "flex" : "none";
  });
};

selectBairro.addEventListener("change", applyFilters);
selectCategoria.addEventListener("change", applyFilters);

// Atualiza categorias ao carregar a página
updateCategories();

// Ação do botão "ver mais" - armazena dados no localStorage
const seemoreBtn = document.querySelectorAll(".seemore-btn");

seemoreBtn.forEach((element) => {
  element.addEventListener("click", () => {
    let idImovelBox = element.closest("[data-id]").getAttribute("data-id");
    console.log(idImovelBox);

    window.location = `../imoveis-pages/index.html`;

    const qtdBanheirosLS = element
      .closest("[data-banheiros]")
      .getAttribute("data-banheiros");
    localStorage.setItem("banheiros", qtdBanheirosLS);

    const qtdQuartosLS = element
      .closest("[data-quartos]")
      .getAttribute("data-quartos");
    localStorage.setItem("quartos", qtdQuartosLS);

    const bairroLS = element
      .closest("[data-bairro]")
      .getAttribute("data-bairro");
    localStorage.setItem("bairro", bairroLS);

    const valorLS = element.closest("[data-valor]").getAttribute("data-valor");
    localStorage.setItem("valor", valorLS);

    const idLS = element.closest("[data-id]").getAttribute("data-id");
    localStorage.setItem("id", idLS);

    const categoriaLS = element
      .closest("[data-categoria]")
      .getAttribute("data-categoria");
    localStorage.setItem("categoria", categoriaLS);
  });
});
