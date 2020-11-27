import { JOKES, settings } from './config.js';
import { APP_MODE } from './models.js';
import { rand } from './utils.js';

export default class Preloader {
  constructor() {
    this.preloader = document.getElementById('preloader');
    this.preloaderText = document.getElementById('preloader-joke');
    if (settings.mode === APP_MODE.DEV) {
      this.jokes = JOKES;
    }
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
  }

  getJoke() {
    return `${this.jokes[rand(0, this.jokes.length)]}...`;
  }

  enable(withJoke = true) {
    this.preloader.classList.remove('invisible');
    if (withJoke && this.jokes) {
      this.preloaderText.innerHTML = this.getJoke();
      this.jokeTimer = setInterval(() => {
        this.preloaderText.innerHTML = this.getJoke();
      }, settings.jokeSwitchTime);
    }
  }

  disable() {
    setTimeout(() => {
      this.preloader.classList.add('invisible');
      clearInterval(this.jokeTimer);
    }, settings.preloaderMinTime);
  }
}