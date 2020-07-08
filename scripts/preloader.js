import { JOKES, settings } from './config.js';
import { APP_MODE } from './models.js';
import { rand } from './utils.js';

export default class Preloader {
  constructor() {
    this.instance = document.getElementById('preloader');
    if (settings.mode === APP_MODE.PROD) {
      const req = new XMLHttpRequest();
      req.onload = () => {
        if (req.status === 200) {
          this.jokes = req.response.split('\n');
        } else {
          alert('Preloader cannot load data');
        }
      }
      req.open("GET", 'assets/preloader.txt', false);
      req.send();
    }
    if (settings.mode === APP_MODE.DEV) {
      this.jokes = JOKES;
    }
  }

  getJoke() {
    return `${this.jokes[rand(0, this.jokes.length)]}...`;
  }

  enable() {
    this.instance.classList.remove('invisible');
    if (this.jokes) {
      this.instance.innerText = this.getJoke();
      this.timer = setInterval(() => {
        this.instance.innerText = this.getJoke();
      }, 3000)
    }
  }

  disable() {
    this.instance.classList.add('invisible');
    clearInterval(this.timer);
  }
}