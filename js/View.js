export class View {
	constructor() {
		this.cellSize = 64;
		this.graphicalPheromones = true;
		this.timerButton = document.getElementById('timerButton');
		this.timerButton.style.backgroundColor = '#4caf50';
		this.pheromonesButton = document.getElementById('pheromonesButton');
		this.pheromonesButton.style.backgroundColor = '#4caf50';
		this.timerElement = document.getElementById('timer');
		this.canvas = document.getElementById('maze');
		this.ctx = this.canvas.getContext('2d');

		// Préchargement des images
		this.imageCache = {};
		this.imagePromises = this.preloadImages([
			'free',
			'obstacle',
			'start',
			'objective',
		]);
	}

	preloadImages(types) {
		return types.map((type) => {
			return new Promise((resolve, reject) => {
				const img = new Image();
				img.src = `images/${type}.png`;
				img.onload = () => {
					this.imageCache[type] = img;
					resolve(); // Résout la promesse une fois que l'image est chargée
				};
				img.onerror = reject; // Rejette la promesse en cas d'erreur de chargement
			});
		});
	}

	renderMaze(maze) {
		this.canvas.width = this.canvas.height =
			maze.cellsBySide * this.cellSize;

		for (let x = 0; x < maze.cellsBySide; x++) {
			for (let y = 0; y < maze.cellsBySide; y++) {
				const cellType = maze.cells[x][y].getType().toLowerCase();
				const img = this.imageCache[cellType];

				this.ctx.drawImage(
					img,
					x * this.cellSize,
					y * this.cellSize,
					this.cellSize,
					this.cellSize
				);

				if (cellType === 'free') {
					const pheromoneQty = maze.cells[x][y]._qty.toFixed(2);
					// Met en couleur le resultat en fonction de pheromoneQty (0 = Rouge, 1 = Vert)
					const color = this.getColorForPheromoneQty(pheromoneQty);
					if (this.graphicalPheromones) {
						const circleRadius = pheromoneQty * this.cellSize / 2.2;
						// Calcule la position centrale de la cellule
						const circleX = x * this.cellSize + this.cellSize / 2;
						const circleY = y * this.cellSize + this.cellSize / 2;

						this.ctx.beginPath();
						this.ctx.arc(
							circleX,
							circleY,
							circleRadius,
							0,
							2 * Math.PI
						);
						this.ctx.fillStyle = color;
						this.ctx.fill();
					} else {
						const fontSize = 18;
						// Calcule la position centrale de la cellule
						const textX =
							x * this.cellSize +
							this.cellSize / 2 -
							this.ctx.measureText(pheromoneQty).width / 2;
						const textY =
							y * this.cellSize +
							this.cellSize / 2 +
							fontSize / 2;

						this.ctx.fillStyle = color;
						this.ctx.font = `${fontSize}px Arial`;
						this.ctx.fillText(pheromoneQty, textX, textY);
					}
				}
			}
		}
	}

	getColorForPheromoneQty(pheromoneQty) {
		return `rgb(${Math.min(
			510 - Math.floor(510 * pheromoneQty),
			255
		)},${Math.min(Math.floor(510 * pheromoneQty), 255)},0)`;
	}

	updateTimer(ms) {
		this.timerElement.textContent =
			Math.floor(ms / 60000)
				.toString()
				.padStart(2, '0') +
			':' +
			Math.floor((ms % 60000) / 1000)
				.toString()
				.padStart(2, '0') +
			':' +
			Math.floor((ms % 1000) / 10)
				.toString()
				.padStart(2, '0');
	}

	displayStartButton() {
		this.timerButton.textContent = 'Start';
		this.timerButton.style.backgroundColor = '#4caf50';
	}

	displayStopButton() {
		this.timerButton.textContent = 'Stop';
		this.timerButton.style.backgroundColor = '#d70000';
	}
}
