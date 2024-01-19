import { Free } from "./Free.js";
import { Obstacle } from "./Obstacle.js";
import { Objective } from "./Objective.js";
import { Start } from "./Start.js";

export class Maze {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.cells = [];
    this.luckOfFreeCell = 1;
    this.numberOfObjective = 1 + Math.round(Math.random() * (Math.max(this.width, this.height)/10));
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
    for (let x = 0; x < this.height; x++) {
      let row = [];
      for (let y = 0; y < this.width; y++) {
        row.push(null);
      }
      this.cells.push(row);
    }
    // Génère les coordonnées du point de départ
    const startX = Math.floor(
      this.width / 3 + (Math.random() * this.width) / 3
    );
    const startY = Math.floor(
      this.height / 3 + (Math.random() * this.height) / 3
    );
    const startCell = new Start(startX, startY);
    // Part du point de départ pour générer le chemin libre
    this.cells[startX][startY] = startCell;
    for (const [dx, dy] of this.directions) {
      const newX = startCell.x + dx;
      const newY = startCell.y + dy;
      const newCell = new Free(newX, newY);
      this.cells[newX][newY] = newCell;
      this.createMazeRecursive(newCell);
    }
  }

  fillWithObstacle() {
    for (let x = 0; x < this.height; x++) {
      for (let y = 0; y < this.width; y++) {
        if (this.cells[x][y] === null) {
          this.cells[x][y] = new Obstacle(x, y);
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
      let newCell;
      // Génère des obstacles sur le contour
      if (
        newX === this.width - 1 ||
        newX === 0 ||
        newY === this.height - 1 ||
        newY === 0
      ) {
        newCell = new Obstacle(newX, newY);
        this.cells[newX][newY] = newCell;
      } else if (this.isValidPosition(newX, newY) && !this.cells[newX][newY]) {
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
