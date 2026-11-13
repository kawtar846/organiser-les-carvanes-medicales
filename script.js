const statistiques = {
  totalPatients: 0,
  fichesSynchronisees: 0,
  derniereSynchro: new Date(Date.now() - 2 * 60 * 1000) // il y a 2 minutes
};

function afficherStatistiques() {
  const total = document.getElementById("total-patients");
  if (total) total.textContent = statistiques.totalPatients;

  const pourcentage = statistiques.totalPatients === 0
    ? 100
    : Math.round((statistiques.fichesSynchronisees / statistiques.totalPatients) * 100);

  const texte = document.getElementById("pourcentage-synchro");
  const barre = document.getElementById("barre-synchro");
  if (texte) texte.textContent = pourcentage;
  if (barre) barre.style.width = pourcentage + "%";
}

function afficherDerniereSynchro() {
  const zone = document.getElementById("derniere-synchro");
  if (!zone) return;

  const minutes = Math.floor((Date.now() - statistiques.derniereSynchro) / 60000);
  if (minutes < 1) zone.textContent = "À l'instant";
  else if (minutes < 60) zone.textContent = "Il y a " + minutes + " min";
  else zone.textContent = "Il y a " + Math.floor(minutes / 60) + " h";
}

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

const compte = document.getElementById("compte");
const compteBouton = document.getElementById("compte-bouton");

if (compte && compteBouton) {
  compteBouton.addEventListener("click", function (e) {
    e.stopPropagation();
    compte.classList.toggle("ouvert");
  });

  document.addEventListener("click", function () {
    compte.classList.remove("ouvert");
  });
}

afficherStatistiques();
afficherDerniereSynchro();
setInterval(afficherDerniereSynchro, 30000); // mise à jour toutes les 30 s
