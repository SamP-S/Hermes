// timer class that measures ellapsed seconds or milliseconds
// works by setting a start time
// then using a "getter" to find the difference since then
class Timer {
  // does start the Timer but can be restarted with the start() function
  constructor() {
    this.startTime = Date.now();
  }

  // resets the timer to 0
  start() {
    reset();
  }

  // resets the timer to 0
  reset() {
    this.startTime = Date.now();
  }

  getTime(isMilliseconds) {
    if (isMilliseconds) { return Date.now() - this.startTime; }
    else { return (Date.now() - this.startTime) / 1000; }
  }
}
