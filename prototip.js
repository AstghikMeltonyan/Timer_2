function Timer(seconds) {
  if (typeof seconds !== "number" || seconds < 0) {
    throw new TypeError("Secunda doljna bit chislom bolshe odnovo");
  }
  this.startTime = seconds;
  this.currentTime = seconds;
}

const methods = {
  start() {
    this.interval = setInterval(() => this.tick(), 1000);
  },

  pause() {
    clearInterval(this.interval);
  },

  reset(){
    this.pause()
    this.currentTime = this.startTime
  },

  tick() {
    if (this.currentTime < 1) {
      this.currentTime = 0;
      this.pause();
      return;
    }
    --timer.currentTime;
  },

  getComponent() {
    const root = document.createElement("div");
    const currentTimeDisplay = document.createElement("div");
    const startButton = document.createElement("button");
    const pauseButton = document.createElement("button");
    const resetButton = document.createElement("button");

    root.append(currentTimeDisplay);
    root.append(startButton, pauseButton, resetButton);

    startButton.textContent = "Start";
    pauseButton.textContent = "Pause";
    resetButton.textContent = "Reset";
    startButton.addEventListener("click", () => this.start());
    pauseButton.addEventListener("click", () => this.pause());
    resetButton.addEventListener("click", () => this.reset());

    this.displayElement = currentTimeDisplay;
    this.displayElement.textContent = timer.currentTime;

    return root;
  },
};

Object.assign(Timer.prototype, methods);
Object.defineProperty(Timer.prototype, "currentTime", {
  set(value) {
    if (this.displayElement) {
      this.displayElement.textContent = this.currentTime;
    }
    this._currentTime = value;
  },

  get() {
    return this._currentTime;
  },
});

const timer = new Timer(10);

document.getElementById("root").append(timer.getComponent());
