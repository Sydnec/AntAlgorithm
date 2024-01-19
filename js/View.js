export class View {
  constructor() {
    this.cellSize;
    this.showPheromones = false;
    this.timerButton = document.getElementById("timerButton");
    this.timerButton.style.backgroundColor = "#4caf50";
    this.pheromonesButton = document.getElementById("pheromonesButton");
    this.pheromonesButton.style.backgroundColor = "#888888";
    this.timerElement = document.getElementById("timer");
    this.canvas = document.getElementById("gridCanvas");
  }

  renderMaze(maze) {
    this.cellSize = Math.min(
      this.canvas.width / maze.width,
      this.canvas.height / maze.height
    );
    this.cellSize = Math.min(
      this.canvas.width / maze.width,
      this.canvas.height / maze.height
    );
    const ctx = this.canvas.getContext("2d");

    for (let x = 0; x < maze.height; x++) {
      for (let y = 0; y < maze.width; y++) {
        const cellType = maze.cells[x][y].getType();
        const img = new Image();
        img.src = `images/${cellType.toLowerCase()}.png`;
        if (cellType === "Free") {
          img.textContent = maze.cells[x][y].getQty();
        }

        img.onload = () => {
          ctx.drawImage(
            img,
            y * this.cellSize,
            x * this.cellSize,
            this.cellSize,
            this.cellSize
          );
        };
      }
    }
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
