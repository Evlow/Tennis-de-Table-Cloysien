document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  const toggleMenu = (event) => {
    event.stopPropagation();
    navMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
  };

  const closeAllSubmenus = () => {
    document.querySelectorAll(".list-inner.active").forEach((submenu) => {
      submenu.classList.remove("active");
      submenu.style.display = "none";
    });
  };

  const toggleSubmenu = (event, item) => {
    event.preventDefault();
    const submenu = item.querySelector(".list-inner");

    if (submenu) {
      const isActive = submenu.classList.contains("active");
      closeAllSubmenus();
      submenu.classList.toggle("active", !isActive);
      submenu.style.display = isActive ? "none" : "block";
    }
  };

  const closeMenuOnClickOutside = (event) => {
    if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
      closeAllSubmenus();
    }
  };

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", toggleMenu);
  }

  document.querySelectorAll(".list").forEach((item) => {
    const link = item.querySelector("a");
    if (link) {
      link.addEventListener("click", (event) => toggleSubmenu(event, item));
    }

    const submenuLinks = item.querySelectorAll(".list-inner a");
    submenuLinks.forEach((subLink) => {
      subLink.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");
        closeAllSubmenus();
      });
    });
  });

  document.addEventListener("click", closeMenuOnClickOutside);
});



