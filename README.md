# Archive inconnue

Projet ARG statique immersif inspiré d’une archive système instable. Le site simule une interface de récupération de données, avec journaux, preuves, accès protégé et couches cachées.

## Présentation

Le projet est structuré comme une petite expérience narrative interactive :

- accès restreint avec faux écran d’authentification
- terminal de lecture de logs
- journaux et preuves à consulter
- clé de restauration à déduire
- page finale et archive cachée

## Structure du projet

- [index.html](index.html) — page principale du jeu
- [style.css](style.css) — design visuel de l’interface
- [script.js](script.js) — logique des indices, console et validation des clés
- [final.html](final.html) — écran final de restauration
- [vault.html](vault.html) — archive cachée profonde
- [404.html](404.html) — page d’erreur immersive
- [files/registry_01.txt](files/registry_01.txt) — registre principal
- [files/copy_note.txt](files/copy_note.txt) — note récupérée
- [files/analyst_report_A.txt](files/analyst_report_A.txt) — rapport de la copie
- [files/review_report_B.txt](files/review_report_B.txt) — second relevé
- [files/last_trace.txt](files/last_trace.txt) — trace finale

## Lancement local

Pour tester le projet localement :

python3 -m http.server 8080

Puis ouvrir :

http://localhost:8080

## Identifiants de démonstration

- utilisateur : ARCHIVE_OP
- mot de passe : PLUME

## Notes

Le projet est pensé pour être complètement statique, sans base de données ni backend. Il est donc facile à déployer sur un hébergement de fichiers statiques comme GitHub Pages, Netlify ou un simple serveur web.
