export class Ant {
	constructor(cell) {
		// Constantes
		this.gamma = 0.05;
		this.pheromonesAdded = 0.5;

		this.cellSize = 64;
		this.cell = cell;
		this.memory = [cell];
		this.path = [];
		this.foodFound = false;

		this.canvas = document.getElementById('maze');
		this.ctx = this.canvas.getContext('2d');
		this.img = new Image();
		this.img.src = 'images/ant.png';
		this.img.onload = () => {
			this.display();
		};
	}

	move(maze) {
		// Déplacement
		this.cell = this.chooseBestCell(maze);
		// Comportement sur la case
		if (this.cell.getType() === 'Objective') {
			this.foodFound = true;
			this.path = [this.cell];
			this.cell._qty = this.cell._qty - 0.1;
			if (this.cell._qty <= 0)
				maze.noMoreFood(this.cell.x, this.cell.y);
		} else if (this.cell.getType() === 'Start') {
			this.memory = [this.cell];
			if (this.foodFound) {
				this.path.forEach((cell) => {
					if (cell.getType() === 'Objective') return;
					cell._qty = this.calculPheromones(cell);
				});
			}
			this.path = [];
			this.foodFound = false;
		} else {
			if (this.foodFound) {
				this.path.push(this.cell);
			} else {
				this.memory.push(this.cell);
			}
		}
		this.display();
	}

	calculPheromones(cell) {
		let qty = cell._qty;
		let xStart = this.path[0].x;
		let yStart = this.path[0].y;
		let xEnd = this.memory[0].x;
		let yEnd = this.memory[0].y;
		let absoluteMinimumLength =
			Math.abs(xEnd - xStart) + Math.abs(yEnd - yStart);
		return Math.min(
			qty +
				this.pheromonesAdded *
					(absoluteMinimumLength / this.path.length) +
				(1 / this.path.indexOf(cell)) * 0.1,
			1
		);
	}

	chooseBestCell(maze) {
		let possibleCells = maze.getValidNeighbors(this.cell);
		if (this.foodFound) {
			// Chemin Retour
			let bestCell = null;
			possibleCells.forEach((cell) => {
				let index = this.memory.indexOf(cell);
				if (index !== -1) {
					bestCell =
						!bestCell || this.memory.indexOf(bestCell) > index
							? cell
							: bestCell;
				}
			});
			return bestCell;
		} else {
			// Chemin aller
			let sum = 0;
			for (let i = 0; i < possibleCells.length; i++) {
				if (possibleCells[i].getType() === 'Objective')
					return possibleCells[i];
				sum += this.probaDiscover(possibleCells[i]);
			}
			if (
				this.probaDiscover(possibleCells[0]) / sum ===
				1 / possibleCells.length
			) {
				// Toutes les mêmes proba
				// Priorise les cases non explorées
				let unexploredCells = possibleCells.filter(
					(cell) => !this.memory.includes(cell)
				);
				if (unexploredCells.length > 0) {
					return unexploredCells[
						Math.floor(Math.random() * unexploredCells.length)
					];
				} else {
					let random = Math.random();
					let currentProba = 0;
					for (let i = 0; i < possibleCells.length; i++) {
						if (
							random <
							currentProba +
								this.probaDiscover(possibleCells[i]) / sum
						) {
							return possibleCells[i];
						}
						currentProba +=
							this.probaDiscover(possibleCells[i]) / sum;
					}
				}
			} else {
				let random = Math.random();
				let currentProba = 0;
				for (let i = 0; i < possibleCells.length; i++) {
					if (
						random <
						currentProba +
							this.probaDiscover(possibleCells[i]) / sum
					) {
						return possibleCells[i];
					}
					currentProba += this.probaDiscover(possibleCells[i]) / sum;
				}
			}
		}
	}

	probaDiscover(cell) {
		let qty = cell.getType() === 'Start' ? 0 : cell._qty;
		return this.gamma + qty;
	}

	display() {
		this.ctx.drawImage(
			this.img,
			this.cell.x * this.cellSize,
			this.cell.y * this.cellSize,
			this.cellSize,
			this.cellSize
		);
	}
}
