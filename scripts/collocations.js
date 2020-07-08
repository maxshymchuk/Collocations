import { SPEECH_PARTS } from './models.js';
import Connector from './connector.js';
import { setPreloader } from './preloader.js';

const connector = new Connector();

connector.init();

setPreloader(connector.loaded);

window.onload = () => {
    document.getElementById('update').onclick = async () => {
        const noun = await connector.getWord(SPEECH_PARTS.NOUN);
        const adj = await connector.getWord(SPEECH_PARTS.ADJ);
        console.log(noun + ' ' + adj);
    }
}