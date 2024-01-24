import { Maze } from '../modules/Maze.js';
import { Ant } from '../modules/Ant.js';

export class Model {
	constructor() {
		this.ms = 0;
		this.fps = 10;
		this.intervalId = null;
		this.isRunning = false;
		this.startTime = null;

		this.myMaze = new Maze(15);
		this.myAnts = Array.from({ length: 5 }, () => new Ant(this.myMaze.startCell));
	}

	startChrono() {
		this.startTime = new Date().getTime() - this.ms;
		this.isRunning = true;
	}

	stopChrono() {
		this.ms = new Date().getTime() - this.startTime;
		this.isRunning = false;
	}

	tick() {
		if (this.isRunning) {
			this.ms = new Date().getTime() - this.startTime;
			this.decreasePheromones()
			this.myAnts.forEach(ant => {
				ant.move(this.myMaze)
			});
		}
	}

	decreasePheromones(){
		this.myMaze.cells.forEach(line => {
			line.forEach(cell => {
				if(cell.getType() === "Free"){
					cell.setQty(Math.max(cell.getQty() - 0.01, 0))
				}
			});
		});
	}
}
