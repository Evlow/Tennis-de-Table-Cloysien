document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle"); // Icône menu burger
  const navMenu = document.getElementById("nav-menu"); // Menu principal
  const phaseToggles = document.querySelectorAll(".phase-toggle"); // Boutons Phase 1 et 2
  const listItems = document.querySelectorAll(".list"); // Éléments de liste avec sous-menus

  // ✅ Toggle du menu principal (si menu burger présent)
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      navMenu.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }

  phaseToggles.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.preventDefault(); // Empêche le comportement par défaut du lien

      const submenu = toggle.nextElementSibling; // Récupère le sous-menu associé

      // Ferme uniquement les autres sous-menus
      document.querySelectorAll(".submenu").forEach((otherSubmenu) => {
        if (otherSubmenu !== submenu) {
          otherSubmenu.classList.remove("active");
        }
      });

      // Basculer l'affichage du sous-menu sélectionné
      submenu.classList.toggle("active");

      // Basculer la classe active sur le bouton Phase
      toggle.classList.toggle("active");
    });
  });

  // ✅ Gestion des sous-menus généraux
  listItems.forEach((item) => {
    const link = item.querySelector("a");
    const submenu = item.querySelector(".list-inner");

    if (submenu) {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        // Fermer tous les autres sous-menus sauf celui cliqué
        document.querySelectorAll(".list-inner.active").forEach((otherSubmenu) => {
          if (otherSubmenu !== submenu) otherSubmenu.classList.remove("active");
        });

        submenu.classList.toggle("active");
      });

      // Fermer le sous-menu si un lien interne est cliqué
      submenu.querySelectorAll("a").forEach((subLink) => {
        subLink.addEventListener("click", () => {
          submenu.classList.remove("active");
          navMenu.classList.remove("active");
          if (menuToggle) menuToggle.classList.remove("active");
        });
      });
    }
  });

  // ✅ Fermer les menus si on clique à l'extérieur
  document.addEventListener("click", (event) => {
    if (!navMenu.contains(event.target) && (!menuToggle || !menuToggle.contains(event.target))) {
      document.querySelectorAll(".list-inner.active, .submenu.active").forEach((menu) => {
        menu.classList.remove("active");
      });
      navMenu.classList.remove("active");
      if (menuToggle) menuToggle.classList.remove("active");
    }
  });
});
