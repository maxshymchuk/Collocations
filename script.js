import './connector';
import * as config from './config';

const connector = new Connector();

window.onload = () => {
    document.getElementById('update').onclick = () => {
        connector.loadWords();
        alert(JSON.stringify(connector.response));
    }
}

function getDictionaryUrl(word, token = tokens[0]) {
    return `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${token}&lang=ru-ru&text=${word}`;
}