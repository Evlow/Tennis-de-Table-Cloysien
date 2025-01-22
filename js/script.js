document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle'); // Sélection de l'icône du menu hamburger
  const navMenu = document.getElementById('nav-menu'); // Sélection du menu principal

  // Ouverture/fermeture du menu principal
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (event) => {
      event.stopPropagation(); // Empêche le clic de se propager pour éviter la fermeture instantanée
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }

  // Gestion des clics sur les éléments de menu
  const listItems = document.querySelectorAll('.list'); // Sélectionne tous les éléments avec la classe 'list'

  listItems.forEach(item => {
    const link = item.querySelector('a'); // Sélectionne le lien à l'intérieur de l'élément de liste
    const submenu = item.querySelector('.list-inner'); // Sélectionne le sous-menu

    link.addEventListener('click', (event) => {
      event.preventDefault(); // Empêche le lien de naviguer

      // Fermez les autres sous-menus
      listItems.forEach(otherItem => {
        const otherSubmenu = otherItem.querySelector('.list-inner');
        if (otherSubmenu && otherItem !== item) {
          otherSubmenu.classList.remove('active'); // Masquer les autres sous-menus
          otherSubmenu.style.display = 'none'; // Masquer les autres sous-menus
        }
      });

      // Basculez l'affichage du sous-menu courant
      if (submenu) {
        const isActive = submenu.classList.contains('active');
        submenu.classList.toggle('active'); // Ajoute ou enlève la classe 'active'
        submenu.style.display = isActive ? 'none' : 'block'; // Affiche ou masque le sous-menu
      }
    });

    // Fermer le sous-menu si un élément à l'intérieur est cliqué
    const submenuLinks = submenu ? submenu.querySelectorAll('a') : []; // Sélectionner tous les liens à l'intérieur du sous-menu
    submenuLinks.forEach(subLink => {
      subLink.addEventListener('click', (event) => {
        navMenu.classList.remove('active'); // Ferme le menu principal si un lien du sous-menu est cliqué
        menuToggle.classList.remove('active'); // Ferme l'icône du menu hamburger
        if (submenu) {
          submenu.classList.remove('active'); // Masque le sous-menu
          submenu.style.display = 'none'; // Masque le sous-menu
        }
      });
    });
  });

  // Fermer sous-menus et menu principal si clic à l'extérieur
  document.addEventListener('click', (event) => {
    const isClickInside = navMenu.contains(event.target) || (menuToggle && menuToggle.contains(event.target));

    if (!isClickInside) {
      // Ferme tous les sous-menus
      document.querySelectorAll('#nav-menu .list-inner.active').forEach(openSubmenu => {
        openSubmenu.classList.remove('active');
        openSubmenu.style.display = 'none'; // Masquer le sous-menu
      });
      // Ferme le menu principal
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });
});
