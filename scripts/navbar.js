const menuHamburguer = document.querySelector(".menu-hamburguer");
const responsiveNav = document.querySelector(".responsive-nav");
const responsiveNavItems = document.querySelectorAll(".responsive-nav a");

const toggleMenu = () => {
  menuHamburguer.classList.toggle("change");
  if (menuHamburguer.classList.contains("change")) {
    responsiveNav.style.display = "block";
  } else {
    responsiveNav.style.display = "none";
  }
};

menuHamburguer.addEventListener("click", toggleMenu);
responsiveNavItems.forEach((element) => {
  element.addEventListener("click", toggleMenu);
});

window.addEventListener("click", (event) => {
  const OutClick =
    !responsiveNav.contains(event.target) &&
    !menuHamburguer.contains(event.target);

  if (menuHamburguer.classList.contains("change") && OutClick) {
    menuHamburguer.classList.remove("change");
    responsiveNav.style.display = "none";
  }
});
