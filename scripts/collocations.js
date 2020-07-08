import { SPEECH_PARTS } from './models.js';
import Connector from './connector.js';
import Preloader from './preloader.js';

const preloader = new Preloader();
const connector = new Connector();

connector.init();
preloader.disable();

window.onload = () => {
    document.getElementById('update').onclick = async () => {
        preloader.enable();
        const noun = await connector.getWord(SPEECH_PARTS.NOUN);
        const adj = await connector.getWord(SPEECH_PARTS.ADJ);
        preloader.disable();
        console.log(noun + ' ' + adj);
    }
}