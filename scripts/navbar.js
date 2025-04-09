const menuHamburguer = document.querySelector(".menu-hamburguer");
const responsiveNav = document.querySelector(".responsive-nav");

const toggleMenu = () => {
  menuHamburguer.classList.toggle("change");
  if (menuHamburguer.classList.contains("change")) {
    responsiveNav.style.display = "block";
  } else {
    responsiveNav.style.display = "none";
  }
};

menuHamburguer.addEventListener("click", toggleMenu);
