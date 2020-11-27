import { SPEECH_PARTS } from './models.js';
import Connector from './connector.js';
import Preloader from './preloader.js';
import { settings } from "./config.js";

const preloader = new Preloader();

preloader.enable(false);
const connector = new Connector();
preloader.disable();

function isNoun(word) {
    return word.part === SPEECH_PARTS.NOUN;
}

window.onload = () => {
    document.documentElement.style.setProperty(
      '--preloader-time',
      `${settings.preloaderMinTime / 2}ms`
    );
    document.getElementById('button-theme').onclick = async function() {
        preloader.enable();
        const firstWord = await connector.getWord();
        const secondWord = await connector.getWord(
          isNoun(firstWord) ? SPEECH_PARTS.ADJ : SPEECH_PARTS.NOUN
        );
        const collocation = [ firstWord.word, secondWord.word ];
        const answer = isNoun(firstWord) ? collocation : collocation.reverse();
        document.getElementById('answer').innerText = answer.join('\n');
        this.innerText = 'Попробовать еще!'
        preloader.disable();
    }
}

window.addEventListener('resize', () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});