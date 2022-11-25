function toggle() {
  const toggle = document.getElementById("toggle__button");
  const links = document.getElementById("nav__list");
  if (toggle.click) {
    links.classList.toggle("active");
  }
}
