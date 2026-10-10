
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const year = document.getElementById("year");

// Mostrar u ocultar el menú en dispositivos móviles.
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Cerrar menú" : "Abrir menú"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  // Cerrar el menú después de seleccionar una sección.
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
      menuToggle.textContent = "☰";
    });
  });

  // Cerrar el menú si se vuelve a una pantalla grande.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 680) {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
      menuToggle.textContent = "☰";
    }
  });
}

// Actualizar el año del pie de página.
if (year) {
  year.textContent = new Date().getFullYear();
}
