import { Model } from "./Model.js";
import { View } from "./View.js";

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.timerButton.addEventListener("click", () =>
      this.toggleTimerButton()
    );
    this.view.pheromonesButton.addEventListener("click", () =>
      this.togglePheromonesButton()
    );
    window.addEventListener(
      "keydown",
      (event, button = this.view.timerButton) => {
        if (event.key === " ") {
          button.click();
        }
      },
      true
    );

    this.view.renderMaze(this.model.myMaze);
  }

  togglePheromonesButton() {
    if (this.view.showPheromones) {
      this.view.pheromonesButton.style.backgroundColor = "#888888";
    } else {
      this.view.pheromonesButton.style.backgroundColor = "#4caf50";
    }
    this.view.showPheromones = !this.view.showPheromones;
    this.view.renderMaze(this.model.myMaze);
  }

  toggleTimerButton() {
    if (this.model.isRunning) {
      clearInterval(this.model.intervalId);
      this.model.stopChrono();
      this.view.updateTimer(this.model.ms);
      this.view.displayStartButton();
    } else {
      this.model.startChrono();
      this.model.intervalId = setInterval(() => {
        this.model.tick();
        this.view.updateTimer(this.model.ms);
        this.view.renderMaze(this.model.myMaze);
      }, 1000 / this.model.fps);
      this.view.displayStopButton();
    }
  }
}
const app = new Controller(new Model(), new View());
