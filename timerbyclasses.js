class Timer {
  constructor(seconds) {
    if(typeof seconds !== 'number' || seconds < 0) {
      throw new TypeError('Secunda doljna bit chislom bolshe odnovo')
    }
    this.startTime = seconds
    this.currentTime = seconds
  }

  set currentTime(time) {
    this._currentTime = time;
    if(this.displayElement) {
      this.displayElement.textContent = time
    }
  }

  get currentTime() {
    return this._currentTime
  }

  get elapsedTime(){
    return this.startTime - this.currentTime
  }

  start(){
    this.interval = setInterval(()=>this.tick(),1000)
  }

  pause(){
    clearInterval(this.interval)
  }

  reset(){
    this.pause()
    this.currentTime = this.startTime
  }

  tick(){
    if(this.currentTime < 1) {
      this.currentTime = 0;
      this.pause();
      return
    }
    --this.currentTime;
  }

  getComponent() {
    const root = document.createElement('div');
    const currentTimeDisplay = document.createElement('div');
    const startButton = document.createElement('button');
    const pauseButton = document.createElement('button');
    const resetButton = document.createElement('button');
    root.append(currentTimeDisplay);
    root.append(startButton);
    root.append(pauseButton);
    root.append(resetButton);
    startButton.textContent = 'Start';
    pauseButton.textContent = 'Pause';
    resetButton.textContent = 'Reset';
    startButton.addEventListener('click', () => this.start())
    pauseButton.addEventListener('click', () => this.pause())
    resetButton.addEventListener('click', () => this.reset());
    this.displayElement = currentTimeDisplay;
    this.displayElement.textContent = this.currentTime;
    return root
  }
}

const timer = new Timer(15)
const timerSwatch = document.getElementById('root')
timerSwatch.append(timer.getComponent());
