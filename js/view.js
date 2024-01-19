class View {
	constructor() {
		this.toggleButton = document.getElementById('toggleButton');
		this.timerElement = document.getElementById('timer');
		this.canvas = document.getElementById('gridCanvas')
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
		this.toggleButton.textContent = 'Start';
		this.toggleButton.style.backgroundColor = '#4caf50';
	}
	displayStopButton() {
		this.toggleButton.textContent = 'Stop';
		this.toggleButton.style.backgroundColor = '#d70000';
	}
}
