# AntAlgorithm

AntAlgorithm est une simulation du comportement des fourmis utilisant des phéromones pour trouver des objectifs dans un labyrinthe. Le projet est composé de fichiers HTML, CSS et JavaScript natif organisés comme suit :

    .
    ├── README.md
    ├── index.html
    ├── css
    │   └── style.css
    ├── images
    │   ├── ant.png
    │   ├── free.png
    │   ├── objective1.png
    │   ├── objective10.png
    │   ├── objective2.png
    │   ├── objective3.png
    │   ├── objective4.png
    │   ├── objective5.png
    │   ├── objective6.png
    │   ├── objective7.png
    │   ├── objective8.png
    │   ├── objective9.png
    │   ├── obstacle.png
    │   └── start.png
    ├── js
    │   ├── Controller.js
    │   ├── Model.js
    │   └── View.js
    └── modules
        ├── Ant.js
        ├── Cell.js
        ├── Free.js
        ├── Maze.js
        ├── Objective.js
        ├── Obstacle.js
        └── Start.js

## Comment exécuter

    Ouvrir le projet sur VSCode
    S'assurer que l'extension LiveServer est installée
    Lancer le serveur en appuyant sur Go Live en bas à droite
    Ouvrir une page web sur localhost:5500 (si vous avez modifié la configuration par défaut, le serveur peut se trouver sur un autre port)

## CSS

Le fichier CSS (css/style.css) contient les styles pour les éléments HTML du projet. 

## JavaScript
### Controller (js/Controller.js)

La classe Controller est responsable de la gestion de l'interaction entre le modèle (Model) et la vue (View). Elle gère les entrées utilisateur, telles que les clics sur les boutons, et met à jour la vue en conséquence. Le Controller initialise des instances du modèle et de la vue, et établit des écouteurs d'événements pour les clics sur les boutons et les événements clavier. La simulation démarre lorsque le bouton "Start" est cliqué ou que la barre espace est pressée, et les fourmis naviguent dans le labyrinthe.
### Model (js/Model.js)

La classe Model représente les données et la logique de la simulation. Elle inclut un labyrinthe, des fourmis, et des méthodes pour contrôler la simulation. Les fourmis se déplacent à travers le labyrinthe, laissant des phéromones et trouvant des objectifs. Le modèle inclut également une méthode pour diminuer les niveaux de phéromones au fil du temps.
### View (js/View.js)

La classe View gère la représentation visuelle de la simulation. Elle se charge de rendre le labyrinthe sur le canevas, de mettre à jour l'affichage du minuteur et de basculer la représentation graphique des phéromones. La classe View utilise l'API Canvas HTML pour dessiner le labyrinthe et les fourmis. Elle précharge également des images pour différents types de cellules.
### Ant (modules/Ant.js)

La classe Ant représente une fourmi dans la simulation. Les fourmis se déplacent à travers le labyrinthe, laissant des phéromones, et ont des comportements spécifiques suivant les types de cellules qu'elles rencontrent. La classe inclut des méthodes pour choisir la meilleure cellule à atteindre et mettre à jour l'affichage.
### Cell (modules/Cell.js)

La classe Cell est la classe de base pour différents types de cellules dans le labyrinthe, comme Libre, Obstacle, Objectif, et Départ. Elle inclut des propriétés et des méthodes communes partagées par tous les types de cellules.
### Free, Obstacle, Objective, Start (modules/Free.js, modules/Obstacle.js, modules/Objective.js, modules/Start.js)

Ces classes représentent différents types de cellules dans le labyrinthe. Elles étendent la classe Cell et fournissent des implémentations spécifiques pour chaque type de cellule.
### Maze (modules/Maze.js)

La classe Maze génère le labyrinthe, plaçant des obstacles, des objectifs, et le point de départ. Elle inclut des méthodes pour créer le labyrinthe de manière récursive et remplir l'espace restant avec des obstacles. La classe fournit également des fonctionnalités pour obtenir des voisins valides pour une cellule donnée necessaire au déplacement des fourmies.
## HTML

Le fichier HTML (index.html) est le point d'entrée principal de l'application. Il inclut le fichier CSS et JavaScript nécessaires et définit la structure de la page web. La section d'informations (#infos) affiche le minuteur et les boutons pour contrôler la simulation, tandis que le canevas (#canvas) est utilisé pour afficher la simulation.
