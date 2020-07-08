import { JOKES, settings } from './config.js';
import { APP_MODE } from './models.js';
import { rand } from './utils.js';

export default class Preloader {
  constructor() {
    this.preloader = document.getElementById('preloader');
    this.preloaderText = document.getElementById('preloader-joke');
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
    this.preloader.classList.remove('invisible');
    if (this.jokes) {
      this.preloaderText.innerText = this.getJoke();
      this.timer = setInterval(() => {
        this.preloaderText.innerText = this.getJoke();
      }, 3000)
    }
  }

  disable() {
    this.preloader.classList.add('invisible');
    clearInterval(this.timer);
  }
}