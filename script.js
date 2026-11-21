// Script du site de l'Omni-système (chargé par index.html) : dé de démonstration, copie de l'adresse.
(function(){
  var mode = "normal";
  var de = document.getElementById("de");
  var valeur = document.getElementById("valeur");
  var resultat = document.getElementById("resultat");
  var boutonsMode = document.querySelectorAll(".modes button");

  boutonsMode.forEach(function(b){
    b.addEventListener("click", function(){
      mode = b.dataset.mode;
      boutonsMode.forEach(function(x){ x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
    });
  });

  function d20(){ return Math.floor(Math.random() * 20) + 1; }

  document.getElementById("lancer").addEventListener("click", function(){
    var a = d20(), b = d20(), garde = a, detail = "";
    if (mode === "avantage"){ garde = Math.max(a,b); detail = "Deux dés : " + a + " et " + b + ". On garde le meilleur. "; }
    if (mode === "desavantage"){ garde = Math.min(a,b); detail = "Deux dés : " + a + " et " + b + ". On garde le pire. "; }

    de.classList.remove("roule","crit-reussite","crit-echec");
    void de.offsetWidth;
    de.classList.add("roule");
    valeur.textContent = garde;

    var verdict = "Résultat : <strong>" + garde + "</strong>, à ajuster avec vos bonus et malus.";
    if (garde === 20){ de.classList.add("crit-reussite"); verdict = "<strong>20 naturel : succès critique !</strong>"; }
    if (garde === 1){ de.classList.add("crit-echec"); verdict = "<strong>1 naturel : échec critique.</strong>"; }
    resultat.innerHTML = detail + verdict;
  });

  var statut = document.getElementById("copie-statut");
  document.getElementById("copier").addEventListener("click", function(){
    var texte = document.getElementById("email").textContent;
    function selectionner(){
      var r = document.createRange(); r.selectNodeContents(document.getElementById("email"));
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      statut.textContent = "Adresse sélectionnée, copiez-la avec votre appareil.";
    }
    try {
      navigator.clipboard.writeText(texte).then(function(){ statut.textContent = "Adresse copiée."; }, selectionner);
    } catch(e){ selectionner(); }
  });
})();
