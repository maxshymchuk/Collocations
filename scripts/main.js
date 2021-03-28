import Collocator from './classes/Collocator.js';
import Preloader from './classes/Preloader.js';
import config from "./config.js";

const preloader = new Preloader();
const connector = new Collocator();

preloader.show(null, { withJoke: false });

const buttonDom = document.getElementById('button-theme');
const answerDom = document.getElementById('answer');

window.onload = () => {
  document.documentElement.style.setProperty(
    '--preloader-time',
    `${config.preloaderMinTime / 2}ms`
  );
  buttonDom.onclick = async function() {
    const collocation = await connector.getCollocation();
    const adjective = collocation.adjective.toLowerCase();
    const noun = collocation.noun.toLowerCase();
    this.innerText = 'Попробовать еще!'
    preloader.show(() => answerDom.innerText = `${adjective}\n${noun}`);
  }
}

window.addEventListener('resize', () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});