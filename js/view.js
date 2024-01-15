class View {
    constructor(controller) {
        this.controller = controller;
        this.toggleButton = document.getElementById('toggleButton');
        toggleButton.addEventListener('click', () => this.controller.toggle());
    }
    
    displayStartButton(){
        this.toggleButton.textContent = 'Start';
        this.toggleButton.style.backgroundColor = "#4caf50"
    }
    displayStopButton(){
        this.toggleButton.textContent = 'Stop';
        this.toggleButton.style.backgroundColor = "#d70000"
    }
}
