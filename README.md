# Omni-système

Le site de l'Omni-système, le jeu de rôle maison de Ferrus Dantioch : un jeu
de rôle générique pensé pour les débutants, construit autour d'un dé à vingt
faces (d20) et décliné en quatre univers.

**Voir le site :** https://ferrusdantioch.github.io/omni-systeme/

---

## Ce que contient le site

- **La mécanique commune**, en quatre règles : le jet, l'avantage et le
  désavantage, les omni-points, les critiques. Un dé d20 de démonstration
  s'essaie directement sur la page.
- **Quatre univers** : Cyberpunk, Fantasy, Space opéra, Horreur / enquête.
  Chacun a son livret de règles et ses fiches de personnage, à télécharger en
  PDF.
- **Les applications de l'Omni-système**, toutes gratuites :
  - pour la table de jeu : Omni-Grimoire, Omni-Oracle (avec son guide
    d'utilisation et son livret à imprimer) ;
  - écriture, lecture, écoute et bureautique : Omni-Romancier, Omni-Texte,
    Omni-Tableur, Omni-PDF, Omni-Schéma, Omni-Liseuse, Omni-Musique, Omni-Calculateur ;
  - bien-être, sport, accessibilité et organisation : Refuge, Cap, Ma fiche
    (soutien aux personnes IMC), Omni-Budget, Omni-Calories, Omni-Agenda,
    Omni-Courses, Omni-Cooking, Omni-Notes, Omni-Time, Omni-Animalia,
    Omni-MediKit ;
  - création de contenu : Omni-Prompteur, Omni-Transcripteur, Omni-Vidéo,
    Omni-Photo ;
  - jeux : Omni-Défense, Omni-Arcade, Omni-Réflexion.
- **Les romans** nés des parties, écrits avec Omni-Romancier (qui permet aussi d'écrire des romans libres hors JDR).
- **Le contact**, par e-mail et sur Discord.
- **Les mentions légales**, en bas de la page.

## Les fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Les textes et la structure de la page |
| `style.css` | La mise en page (couleurs, polices, tailles) |
| `script.js` | Le dé de démonstration et le bouton « Copier l'adresse » |
| `polices/` | Les trois polices du site (Oxanium, Literata, JetBrains Mono) et leurs licences |
| `licences-tierces.txt` | Les crédits et licences des polices |
| `tests/` | Les contrôles automatiques (voir « Vérifier le site ») |
| `regles/` | Les livrets de règles, les fiches de personnage et la table de folie (Horreur / enquête), en PDF |
| `apercu.png` | L'image affichée quand on partage le lien du site (Discord, réseaux sociaux) |
| `sitemap.xml` | Le plan du site, pour les moteurs de recherche |
| `robots.txt` | Les consignes pour les moteurs de recherche (tout est autorisé) |
| `LICENSE` | La licence du code |

Pour mettre à jour un livret ou une fiche, remplacez le PDF dans `regles/` en
gardant **exactement le même nom de fichier** : sinon, les liens du site ne le
trouvent plus.

## Sécurité et vie privée

- **Rien ne se charge depuis un autre site** : les polices sont copiées dans
  `polices/` (plus de Google Fonts), et une règle de sécurité (CSP, en tête de
  `index.html`) interdit au navigateur de charger quoi que ce soit ailleurs.
  Les liens vers Discord, GitHub ou Creative Commons restent cliquables.
- À cause de cette règle, **rien ne s'écrit directement dans `index.html`** :
  pas de `<style>`, pas de code `<script>`, pas d'attribut `style="…"` ni
  `onclick="…"`. La mise en page va dans `style.css`, le code dans `script.js`.

## Vérifier le site

```bash
node --test
```
À lancer depuis le dossier du site (il suffit d'avoir Node.js, rien à
installer). Vérifie la règle de sécurité, l'absence de chargement externe, la
présence des fichiers appelés et des polices avec leurs licences, et la taille
des petits boutons (44 px).

## Publication

Le site est publié par GitHub Pages depuis la branche `main`, dossier racine.
Il se met à jour 1 à 2 minutes après chaque envoi. Il n'a pas de mode
hors-ligne, donc aucun numéro de version à changer.

## Droits et licence

**Règles, fiches, logos et textes : tous droits réservés.** Les règles, fiches
de personnage, tables, logos et textes de l'Omni-système, y compris les PDF du
dossier `regles/`, sont la création de Ferrus Dantioch. Toute reproduction
sans autorisation est interdite. Ils ne sont pas couverts par la licence du
code.

**Code : © 2026 Ferrus Dantioch — Creative Commons BY-NC-ND 4.0**
([résumé de la licence en français](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.fr)).
Le code de la page (HTML, CSS et JavaScript) et celui de toutes les
applications de l'Omni-système sont sous cette licence. En clair : le partage
est autorisé, à l'identique et en citant l'auteur ; l'usage commercial est
interdit ; la modification et les œuvres dérivées sont interdites. Le logiciel
est fourni « en l'état », sans aucune garantie. Texte complet dans le fichier
[LICENSE](LICENSE) : le texte officiel en anglais, suivi de la traduction
française officielle publiée par Creative Commons.
