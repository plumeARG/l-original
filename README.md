
# Archive inconnue

ARG statique immersive inspirée d’une archive système instable, avec accès protégé, journaux, preuves, clé de restauration et couche cachée.

## Version actuelle

- écran d’authentification sécurisé
- interface d’archive et de journaux
- système de clés et indices
- page finale + archive cachée
- préparation pour publication GitHub Pages

## Structure principale

- [index.html](index.html) — page d’accueil et interface principale
- [style.css](style.css) — design sombre de type archive / terminal
- [script.js](script.js) — logique du jeu, indices, terminal et auth
- [final.html](final.html) — page finale de restauration
- [vault.html](vault.html) — archive profonde cachée
- [404.html](404.html) — page d’erreur immersive
- [files/registry_01.txt](files/registry_01.txt) — registre principal
- [files/copy_note.txt](files/copy_note.txt) — note récupérée
- [files/analyst_report_A.txt](files/analyst_report_A.txt) — rapport de la copie
- [files/review_report_B.txt](files/review_report_B.txt) — second relevé
- [files/last_trace.txt](files/last_trace.txt) — trace finale

## Lancement local

Ouvrez simplement [index.html](index.html) dans le navigateur, ou lancez un serveur local :

python3 -m http.server 8080

Puis ouvrez : http://localhost:8080

## Accès de démonstration

- utilisateur : ARCHIVE_OP
- mot de passe : PLUME

## Publication publique

Le site est prêt pour GitHub Pages en mode statique via la branche principale.
