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

// Récupère les éléments de la bannière et des boutons
const cookieBanner = document.getElementById("cookie-banner");
const acceptButton = document.getElementById("accept-cookies");
const refuseButton = document.getElementById("refuse-cookies");

// Vérifie si l'utilisateur a déjà pris une décision
if (localStorage.getItem("cookiesAccepted") === "true") {
  // Si accepté, cache la bannière
  cookieBanner.classList.add("hidden");
} else if (localStorage.getItem("cookiesAccepted") === "false") {
  // Si refusé, cache aussi la bannière
  cookieBanner.classList.add("hidden");
} else {
  // Si aucune décision n'a été prise, afficher la bannière
  cookieBanner.classList.remove("hidden");
}

// Fonction pour cacher la bannière après acceptation
acceptButton.addEventListener("click", () => {
  localStorage.setItem("cookiesAccepted", "true");
  cookieBanner.classList.add("hidden");
});

// Fonction pour cacher la bannière après refus
refuseButton.addEventListener("click", () => {
  localStorage.setItem("cookiesAccepted", "false");
  cookieBanner.classList.add("hidden");
});


// Fonction pour charger Google Analytics uniquement si l'utilisateur a accepté les cookies
function loadGoogleAnalytics() {
  // Vérifie si le script Google Analytics n'est pas déjà ajouté
  if (!document.querySelector('script[src="https://www.googletagmanager.com/gtag/js?id=G-BY9X1TRKZ7"]')) {
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-BY9X1TRKZ7";  
    script.async = true;
    document.head.appendChild(script);

    script.onload = function() {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-BY9X1TRKZ7'); 
    };
  }
}



