import { SPEECH_PARTS } from './models.js';
import Connector from './connector.js';
import Preloader from './preloader.js';

const preloader = new Preloader();

preloader.enable();
const connector = new Connector();
preloader.disable();

window.onload = () => {
    document.getElementById('button-theme').onclick = async () => {
        preloader.enable();
        const noun = await connector.getWord(SPEECH_PARTS.NOUN);
        const adj = await connector.getWord(SPEECH_PARTS.ADJ);
        preloader.disable();
        console.log(noun + ' ' + adj);
    }
}