class Maze {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.cells = [];

		this.directions = [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1],
		];

		this.initializeMaze();

		for (let x = 0; x < this.height; x++) {
			for (let y = 0; y < this.width; y++) {
				console.log(this.cells[x][y].getType())
			}
		} 
	}

	initializeMaze() {
		for (let x = 0; x < this.height; x++) {
			let row = [];
			for (let y = 0; y < this.width; y++) {
				row.push(null);
			}
			this.cells.push(row);
		}
		this.generateMaze();
	}

	generateMaze() {
		const startX = Math.floor(Math.random() * this.height);
		const startY = Math.floor(Math.random() * this.width);

		const startCell = new Start(startX, startY);
		this.cells[startX][startY] = startCell;

		this.createMazeRecursive(startCell);
	}

	createMazeRecursive(currentCell) {
		const neighbors = this.getUnvisitedNeighbors(currentCell);

		neighbors.sort(() => Math.random() - 0.5);

		for (const [dx, dy] of neighbors) {
			const newX = currentCell.x + dx;
			const newY = currentCell.y + dy;

			if (this.isValidPosition(newX, newY) && !this.cells[newX][newY]) {
				const random = Math.random();
				let newCell;

				if (random < 0.4) {
					newCell = new Objective(newX, newY);
				} else if (random < 0.8) {
					newCell = new Obstacle(newX, newY);
				} else {
					newCell = new Free(newX, newY);
				}

				this.cells[newX][newY] = newCell;
				this.createMazeRecursive(newCell);
			}
		}
	}

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

	isValidPosition(x, y) {
		return x >= 0 && x < this.height && y >= 0 && y < this.width;
	}
}