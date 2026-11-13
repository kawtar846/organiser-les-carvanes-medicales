/* ==========================================================
   Comportement des pages
   ========================================================== */

/* ----------------------------------------------------------
   1. Les données
   Pour l'instant ce sont des valeurs de départ.
   Plus tard, elles viendront de la base de données :
   - le nombre de patients (SELECT COUNT(*) FROM patients)
   - le pourcentage synchronisé (fiches avec synced = 1)
   - l'heure de la dernière synchronisation réussie
   ---------------------------------------------------------- */
const statistiques = {
  totalPatients: 0,
  fichesSynchronisees: 0,
  derniereSynchro: new Date(Date.now() - 2 * 60 * 1000) // il y a 2 minutes
};

/* ----------------------------------------------------------
   2. Afficher les statistiques (page Accueil)
   ---------------------------------------------------------- */
function afficherStatistiques() {
  const total = document.getElementById("total-patients");
  if (total) total.textContent = statistiques.totalPatients;

  // Aucun patient = rien à envoyer, donc 100 % synchronisé
  const pourcentage = statistiques.totalPatients === 0
    ? 100
    : Math.round((statistiques.fichesSynchronisees / statistiques.totalPatients) * 100);

  const texte = document.getElementById("pourcentage-synchro");
  const barre = document.getElementById("barre-synchro");
  if (texte) texte.textContent = pourcentage;
  if (barre) barre.style.width = pourcentage + "%";
}

/* ----------------------------------------------------------
   3. « Dernière synchronisation : il y a X min »
   ---------------------------------------------------------- */
function afficherDerniereSynchro() {
  const zone = document.getElementById("derniere-synchro");
  if (!zone) return;

  const minutes = Math.floor((Date.now() - statistiques.derniereSynchro) / 60000);
  if (minutes < 1) zone.textContent = "À l'instant";
  else if (minutes < 60) zone.textContent = "Il y a " + minutes + " min";
  else zone.textContent = "Il y a " + Math.floor(minutes / 60) + " h";
}

/* ----------------------------------------------------------
   4. Bouton « Synchroniser » (simulation)
   Plus tard : ici on appellera la vraie synchronisation avec le hub.
   ---------------------------------------------------------- */
function synchroniser() {
  statistiques.fichesSynchronisees = statistiques.totalPatients;
  statistiques.derniereSynchro = new Date();
  afficherStatistiques();
  afficherDerniereSynchro();
}

["bouton-synchro", "bouton-synchro-haut"].forEach(function (id) {
  const bouton = document.getElementById(id);
  if (bouton) bouton.addEventListener("click", synchroniser);
});

/* ----------------------------------------------------------
   5. Menu du compte : la flèche ouvre « Se déconnecter »
   ---------------------------------------------------------- */
const compte = document.getElementById("compte");
const compteBouton = document.getElementById("compte-bouton");

if (compte && compteBouton) {
  compteBouton.addEventListener("click", function (e) {
    e.stopPropagation();
    compte.classList.toggle("ouvert");
  });

  // Cliquer ailleurs referme le menu
  document.addEventListener("click", function () {
    compte.classList.remove("ouvert");
  });
}

/* ----------------------------------------------------------
   6. Lancement
   ---------------------------------------------------------- */
afficherStatistiques();
afficherDerniereSynchro();
setInterval(afficherDerniereSynchro, 30000); // mise à jour toutes les 30 s
