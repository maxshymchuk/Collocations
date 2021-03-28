import config from '../config.js';
import { rand, get } from '../utils.js';

export default class Preloader {
  constructor() {
    this.preloader = document.getElementById('preloader');
    this.preloaderText = document.getElementById('preloader-joke');
    this._load();
  }

  async _load() {
    const raw = await get('assets/preloader.txt');
    this.jokes = raw.split('\n');
  }

  _getJoke() {
    return `${this.jokes[rand(0, this.jokes.length)]}...`;
  }

  _enable(withJoke = true) {
    this.preloader.classList.remove('invisible');
    if (withJoke && this.jokes) {
      this.preloaderText.innerHTML = this._getJoke();
      this.jokeTimer = setInterval(() => {
        this.preloaderText.innerHTML = this._getJoke();
      }, config.jokeSwitchTime);
    }
  }

  _disable(callback, time = config.preloaderMinTime) {
    setTimeout(() => {
      this.preloader.classList.add('invisible');
      if (callback) callback();
      clearInterval(this.jokeTimer);
    }, time);
  }

  show(callback, params = {
    withJoke: true, 
    time: config.preloaderMinTime
  }) {
    this._enable(params.withJoke);
    this._disable(callback, params.time);
  }
}