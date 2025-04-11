document.addEventListener("DOMContentLoaded", () => {
  const idLS = localStorage.getItem("id");
  if (!idLS) return console.error("ID não definido no localStorage");

  // Elementos do DOM
  const imgDestaque = document.getElementById("destaque-img");
  const galleryContainer = document.querySelector(".gallery-images");
  const botaoWpp = document.querySelector(".wpp-btn");
  const botaoEmail = document.querySelector(".email-btn");
  const imovelTitle = document.querySelectorAll(".imovel-title");
  const spanValor = document.getElementById("valor");

  // Carrega dados nos spans

  const categoria = localStorage.getItem("categoria") || "Imóvel";
  const bairro = localStorage.getItem("bairro") || "";
  const emojiCategoria = categoria === "Apartamento" ? "🏢" : "🏡";
  imovelTitle.forEach((element) => {
    element.innerHTML = `${categoria} no bairro ${bairro}${emojiCategoria}`;
  });

  const valorLS = localStorage.getItem("valor") || "";
  spanValor.innerText = valorLS ? `R$ ${valorLS}` : "";

  // Configura link do WhatsApp
  if (botaoWpp || botaoEmail) {
    const titulo = imovelTitle?.innerText || "imóvel";
    const banheiros = localStorage.getItem("banheiros") || 0;
    const quartos = localStorage.getItem("quartos") || 0;

    // Mensagem base (com quebra de linha \n para o e-mail)
    const mensagemTexto = `Me interessei neste imóvel: ${titulo}.
  
  • ${banheiros} ${banheiros == 1 ? "banheiro" : "banheiros"}
  • ${quartos} ${quartos == 1 ? "quarto" : "quartos"}
  
  Poderia me passar mais informações?`;

    // Para WhatsApp (precisa ser codificada)
    const mensagemWpp = encodeURIComponent(mensagemTexto);
    botaoWpp.href = `https://wa.me/5534991821068?text=${mensagemWpp}`;

    // Para e-mail (também precisa codificar o assunto e corpo)
    const assunto = encodeURIComponent(`Interesse em imóvel: ${titulo}.`);
    const corpo = encodeURIComponent(mensagemTexto);
    botaoEmail.href = `mailto:coimbraimoveisuberlandia@gmail.com?subject=${assunto}&body=${corpo}`;
  }

  // Função para contar imagens sequenciais na pasta
  function contarImagensNaPasta(id, extensao = "jpg", callback) {
    let index = 1,
      count = 0;
    function testar() {
      const caminho = `../imoveis-pages/${id}/images/image${index}.${extensao}`;
      const img = new Image();
      img.onload = () => {
        count++;
        index++;
        testar();
      };
      img.onerror = () => {
        callback(count);
      };
      img.src = caminho;
    }
    testar();
  }

  // Cria a galeria e define primeira imagem de destaque
  function createGallery(id) {
    if (!galleryContainer) return;
    contarImagensNaPasta(id, "jpg", (total) => {
      for (let i = 1; i <= total; i++) {
        const img = document.createElement("img");
        img.src = `../imoveis-pages/${id}/images/image${i}.jpg`;
        img.alt = `Imagem ${i}`;
        img.classList.add("gallery-img");
        galleryContainer.appendChild(img);
      }
      // destaca a primeira
      const first = galleryContainer.querySelector(".gallery-img");
      if (first && imgDestaque) imgDestaque.src = first.src;
    });
  }

  // Delegação de clique para trocar destaque
  if (galleryContainer && imgDestaque) {
    galleryContainer.addEventListener("click", (e) => {
      if (e.target.matches(".gallery-img")) {
        imgDestaque.src = e.target.src;
      }
    });
  }

  // Fallback inicial de destaque
  if (imgDestaque) {
    imgDestaque.src = `../imoveis-pages/${idLS}/images/image1.jpg`;
  }

  // Executa criação da galeria
  createGallery(idLS);
});
