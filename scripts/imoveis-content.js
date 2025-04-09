const imovelContent = document.getElementById("content");
const id = localStorage.getItem("id");
const banheirosLS = localStorage.getItem("banheiros") || 0;
const banheiros = `${banheirosLS} ${
  banheirosLS == 1 ? "banheiro" : "banheiros"
}`;
const quartosLS = localStorage.getItem("quartos") || 0;
const quartos = `${quartosLS} ${quartosLS == 1 ? "quarto" : "quartos"}`;

if (id == 1) {
  imovelContent.innerHTML = `Apresentamos este incrível imóvel que une conforto, praticidade e localização privilegiada. Com ambientes amplos, iluminados e bem distribuídos, este espaço foi pensado para oferecer qualidade de vida para você e sua família, com ${banheiros} e ${quartos}!`;
} else if (id == 2) {
  imovelContent.innerHTML = "kksskskksk";
}
