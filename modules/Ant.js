export class Ant {
	constructor(x, y) {
		this.cellSize = 64;
		this.x = x;
		this.y = y;
		this.memory = [];

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
		if (this.foodFound) {
			let cell = this.memory.pop();
			console.log(cell)
			this.x = cell.x;
			this.y = cell.y;
			if (maze.cells[this.x][this.y].getType() === 'Start') {
				this.foodFound = false;
				this.memory = [];
			} else {
				maze.cells[this.x][this.y].setQty(maze.cells[this.x][this.y].getQty() + 0.1);
			}
		} else {
			let newCells = maze.getValidNeighbors(this.x, this.y);
			let newCell = newCells[Math.floor(Math.random() * newCells.length)];
			while(this.memory[this.memory.length-2] === newCell){
				newCell = newCells[Math.floor(Math.random() * newCells.length)];
			}
			newCells.forEach((cell) => {
				if (
					cell.getType() !== 'Start' &&
					newCell.getType() !== 'Start' &&
					newCell.getType() !== 'Objective'
				) {
					if (cell.getQty() > newCell.getQty()) {
						newCell = cell;
					}
				}
			});
			if (newCell.getType() === 'Objective') {
				this.foodFound = true;
				maze.cells[newCell.x][newCell.y].setQty(
					maze.cells[newCell.x][newCell.y].getQty() - 0.1
				);
			} else if (newCell.getType() === 'Start') {
				this.memory = [];
				this.memory.push(newCell);
			} else {
				this.memory.push(newCell);
			}
			this.x = newCell.x;
			this.y = newCell.y;
			this.display();
		}
	}

	display() {
		this.ctx.drawImage(
			this.img,
			this.x * this.cellSize,
			this.y * this.cellSize,
			this.cellSize,
			this.cellSize
		);
	}
}
