class Maze {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.cells = [];
		this.luckOfFreeCell = 1;
		this.numberOfObjective = 1 + Math.round(Math.random() * 3)

		console.log(this.numberOfObjective)

		this.directions = [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1],
		];

		this.generateMaze();
		this.fillWithObstacle()
		this.addObjectives()
	}

	generateMaze() {
		for (let x = 0; x < this.height; x++) {
			let row = [];
			for (let y = 0; y < this.width; y++) {
				row.push(null);
			}
			this.cells.push(row);
		}
		// Génère les coordonnées du point de départ
		// Il ne peut pas se retrouver sur un bord
		const startX = 1 + Math.floor(Math.random() * (this.width - 2));
		const startY = 1 + Math.floor(Math.random() * (this.height - 2));
		const startCell = new Start(startX, startY);

		this.cells[startX][startY] = startCell;
		for (const [dx, dy] of this.directions) {
			const newX = startCell.x + dx;
			const newY = startCell.y + dy;

			if(this.isValidPosition(newX, newY)){
				const newCell = new Free(newX, newY);
				this.cells[newX][newY] = newCell;
				this.createMazeRecursive(newCell);
			}
		}
	}

	fillWithObstacle(){
		for (let x = 0; x < this.height; x++) {
			for (let y = 0; y < this.width; y++) {
				if (this.cells[x][y] === null) {
					this.cells[x][y] = new Obstacle(x,y)
				}
			}
		}
	}

	addObjectives() {
		while (this.numberOfObjective > 0) {
			let cellX = Math.floor(Math.random() * this.width);
			let cellY = Math.floor(Math.random() * this.height);
	
			if (this.cells[cellX][cellY].getType() === "Free") {
				this.cells[cellX][cellY] = new Objective(cellX, cellY);
				this.numberOfObjective -= 1;
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
				if (random < this.luckOfFreeCell) {
					newCell = new Free(newX, newY);
					this.luckOfFreeCell -= 0.5/(this.width * this.height)
					this.cells[newX][newY] = newCell;
					this.createMazeRecursive(newCell);
				} else {
					this.luckOfFreeCell += 0.25/(this.width * this.height)
					newCell = new Obstacle(newX, newY);
					this.cells[newX][newY] = newCell;
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