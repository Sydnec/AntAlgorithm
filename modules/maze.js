class Maze {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.cells = [];
		this.minObjective = 1;
		this.maxObjective = 3

		this.directions = [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1],
		];

		this.initializeMaze();
		for (let x = 0; x < this.height; x++) {
			for (let y = 0; y < this.width; y++) {
				if (this.cells[x][y] === null) {
					this.cells[x][y] = new Obstacle(x,y)
				}
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

		let newCell

		const startCell = new Start(startX, startY);
		this.cells[startX][startY] = startCell;
		for (const [dx, dy] of this.directions) {
			const newX = startCell.x + dx;
			const newY = startCell.y + dy;

			if(this.isValidPosition(newX, newY)){
				newCell = new Free(newX, newY);
				this.cells[newX][newY] = newCell;
				this.createMazeRecursive(newCell);
			}
		}
	}

	createMazeRecursive(currentCell) {
		for (const [dx, dy] of this.directions) {
			const newX = currentCell.x + dx;
			const newY = currentCell.y + dy;

			if (this.isValidPosition(newX, newY) && !this.cells[newX][newY]) {
				const random = Math.random();
				let newCell;
				if (random < 0.3) {
					newCell = new Obstacle(newX, newY);
					this.cells[newX][newY] = newCell;
				} else {
					newCell = new Free(newX, newY);
					this.cells[newX][newY] = newCell;
					this.createMazeRecursive(newCell);
				}
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