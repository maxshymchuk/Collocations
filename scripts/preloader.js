export default class Preloader {
  constructor() {
    this.instance = document.getElementById('preloader');
  }

  enable() {
    this.instance.classList.remove('invisible');
  }

  disable() {
    this.instance.classList.add('invisible');
  }
}