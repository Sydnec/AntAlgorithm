export class Ant {
	constructor(cell) {
		this.cellSize = 64;
		this.cell = cell;
		this.memory = [cell];

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
		let possibleCells = maze.getValidNeighbors(this.cell);
		// Déplacement
		this.cell = this.chooseBestCell(possibleCells);
		// Comportement sur la case
		if (this.cell.getType() === 'Objective') {
			this.foodFound = true;
			this.cell.setQty(this.cell.getQty() - 0.1);
		} else if (this.cell.getType() === 'Start') {
			this.memory = [this.cell];
		} else {
			this.memory.push(this.cell);
		}
		this.display();
	}

	chooseBestCell(possibleCells) {
		if (this.foodFound) {
			// Chemin Retour
			// let cell = this.memory.pop();
			// this.x = cell.x;
			// this.y = cell.y;
			// if (cell.getType() === 'Start') {
			// 	this.foodFound = false;
			// 	this.memory = [];
			// } else {
			// 	cell.setQty(cell.getQty() + 0.1);
			// }
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
		let gamma = 0.5;
		let qty = cell.getType() === 'Start' ? 0 : cell.getQty();
		return gamma + qty;
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
