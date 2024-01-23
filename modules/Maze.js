import { Free } from './Free.js';
import { Obstacle } from './Obstacle.js';
import { Objective } from './Objective.js';
import { Start } from './Start.js';

export class Maze {
	constructor(cellsBySide) {
		this.cellsBySide = cellsBySide;
		this.cells = [];
		this.luckOfFreeCell = 1;
		this.startCell = {}
		this.numberOfObjective =
			1 + Math.round(Math.random() * (cellsBySide / 10));
		this.directions = [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1],
		];

		this.generateMaze();
		this.fillWithObstacle();
		this.addObjectives();
	}

	generateMaze() {
		// Créer un tableau de this.cellsBySide² cases initialisée à null
		for (let x = 0; x < this.cellsBySide; x++) {
			let row = [];
			for (let y = 0; y < this.cellsBySide; y++) {
				row.push(null);
			}
			this.cells.push(row);
		}

		// Génère les coordonnées du point de départ
		const startX = Math.floor(
			this.cellsBySide / 3 + (Math.random() * this.cellsBySide) / 3
		);
		const startY = Math.floor(
			this.cellsBySide / 3 + (Math.random() * this.cellsBySide) / 3
		);
		this.startCell = new Start(startX, startY);

		// Part du point de départ pour générer le chemin libre de manière récursive
		this.cells[startX][startY] = this.startCell;
		for (const [dx, dy] of this.directions) {
			const newX = this.startCell.x + dx;
			const newY = this.startCell.y + dy;
			const newCell = new Free(newX, newY);
			this.cells[newX][newY] = newCell;
			this.createMazeRecursive(newCell);
		}
	}

	// Génère des objectifs sur des cases Free est situé sur l'intervale [0; 1/3]U[2/3; 1] *
	addObjectives() {
		while (this.numberOfObjective > 0) {
			let cellX =
				Math.random() < 0.5
					? Math.floor(((Math.random() * 1) / 3) * this.cellsBySide)
					: Math.floor(
							(2 / 3) * this.cellsBySide +
								((Math.random() * 1) / 3) * this.cellsBySide
					  );
			let cellY =
				Math.random() < 0.5
					? Math.floor(((Math.random() * 1) / 3) * this.cellsBySide)
					: Math.floor(
							(2 / 3) * this.cellsBySide +
								((Math.random() * 1) / 3) * this.cellsBySide
					  );
			if (this.cells[cellX][cellY].getType() === 'Free') {
				this.cells[cellX][cellY] = new Objective(cellX, cellY);
				this.numberOfObjective -= 1;
			}
		}
	}

	// Génère des obstacles si c'est un contour
	// sinon génère aléatoirement une case Free ou un obstacle
	// avec des probabilités évolutives
	createMazeRecursive(currentCell) {
		for (const [dx, dy] of this.directions) {
			const newX = currentCell.x + dx;
			const newY = currentCell.y + dy;
			let newCell;
			if (
				newX === this.cellsBySide - 1 ||
				newX === 0 ||
				newY === this.cellsBySide - 1 ||
				newY === 0
			) {
				newCell = new Obstacle(newX, newY);
				this.cells[newX][newY] = newCell;
			} else if (
				this.isValidPosition(newX, newY) &&
				!this.cells[newX][newY]
			) {
				const random = Math.random();
				if (random < this.luckOfFreeCell) {
					newCell = new Free(newX, newY);
					this.luckOfFreeCell -= 0.02;
					this.cells[newX][newY] = newCell;
					this.createMazeRecursive(newCell);
				} else {
					this.luckOfFreeCell += 0.1;
					newCell = new Obstacle(newX, newY);
					this.cells[newX][newY] = newCell;
				}
			}
		}
	}

	// Rempli d'obstacles les zones restantes
	fillWithObstacle() {
		for (let x = 0; x < this.cellsBySide; x++) {
			for (let y = 0; y < this.cellsBySide; y++) {
				if (this.cells[x][y] === null) {
					this.cells[x][y] = new Obstacle(x, y);
				}
			}
		}
	}

	// Récupère les cases voisines pas encore générées
	getUnvisitedNeighbors(cell) {
		const neighbors = [];

		for (const [dx, dy] of this.directions) {
			const newX = cell.x + dx;
			const newY = cell.y + dy;

			if (this.isValidPosition(newX, newY) && !this.cells[newX][newY]) {
				neighbors.push([dx, dy]);
			}
		}

		return neighbors;
	}

	getValidNeighbors(x, y) {
		const neighbors = [];

		for (const [dx, dy] of this.directions) {
			const newX = x + dx;
			const newY = y + dy;

			if (this.isValidPosition(newX, newY) && this.cells[newX][newY].getType() !== 'Obstacle') {
				neighbors.push(this.cells[newX][newY]);
			}
		}

		return neighbors;
	}

	// Vérifie que la position soit valide
	isValidPosition(x, y) {
		return x >= 0 && x < this.cellsBySide && y >= 0 && y < this.cellsBySide;
	}
}
