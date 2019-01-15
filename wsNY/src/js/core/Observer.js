/* eslint-disable no-return-assign */
export default class Observer {
  constructor() {
    this.callbacks = [];
  }

  subscribe(callback) {
    this.callbacks.push(callback);

    return () => this.callbacks = this.callbacks.filter(cb => cb !== callback);
  }

  notify(...args) {
    this.callbacks.forEach(callbacks => callbacks(...args));
  }
}
