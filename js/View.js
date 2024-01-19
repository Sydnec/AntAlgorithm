export class View {
  constructor() {
    this.cellSize = 64;
    this.showPheromones = false;
    this.timerButton = document.getElementById("timerButton");
    this.timerButton.style.backgroundColor = "#4caf50";
    this.pheromonesButton = document.getElementById("pheromonesButton");
    this.pheromonesButton.style.backgroundColor = "#888888";
    this.timerElement = document.getElementById("timer");
    this.canvas = document.getElementById("maze");
    }

  renderMaze(maze) {
    this.canvas.width = this.canvas.height = maze.cellsBySide * this.cellSize;
    const ctx = this.canvas.getContext("2d");

    for (let x = 0; x < maze.cellsBySide; x++) {
      for (let y = 0; y < maze.cellsBySide; y++) {
        const cellType = maze.cells[x][y].getType().toLowerCase();
        const img = new Image();
        img.src = `images/${cellType}.png`;
        img.onload = () => {
          ctx.drawImage(
            img,
            y * this.cellSize,
            x * this.cellSize,
            this.cellSize,
            this.cellSize
          );

          if (cellType === "free") {
            if (this.showPheromones) {
              const pheromoneQty = maze.cells[x][y].getQty().toFixed(2);
              const fontSize = 18;
              // Calcule la position centrale de la cellule
              const textX = y * this.cellSize + this.cellSize / 2 - ctx.measureText(pheromoneQty).width / 2;
              const textY = x * this.cellSize + this.cellSize / 2 + fontSize / 2;

              // Met en couleur le resultat en fonction de pheromoneQty (0 = Jaune, 1 = Rouge)
              const color = this.getColorForPheromoneQty(pheromoneQty);
              ctx.fillStyle = color;

              ctx.font = `${fontSize}px Arial`;
              ctx.fillText(pheromoneQty, textX, textY);
            }
          }
        }
      }
    }
  }

  getColorForPheromoneQty(pheromoneQty) {
    if(pheromoneQty == 0) return `rgb(255,255,255)`;
    return `rgb(255,${255 - Math.floor(255 * pheromoneQty)},0)`;
  }

  updateTimer(ms) {
    this.timerElement.textContent =
      Math.floor(ms / 60000)
        .toString()
        .padStart(2, "0") +
      ":" +
      Math.floor((ms % 60000) / 1000)
        .toString()
        .padStart(2, "0") +
      ":" +
      Math.floor((ms % 1000) / 10)
        .toString()
        .padStart(2, "0");
  }

  displayStartButton() {
    this.timerButton.textContent = "Start";
    this.timerButton.style.backgroundColor = "#4caf50";
  }

  displayStopButton() {
    this.timerButton.textContent = "Stop";
    this.timerButton.style.backgroundColor = "#d70000";
  }
}
