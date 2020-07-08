const settings = {
    mode: APP_MODE.PROD
}

const connector = new Connector();

connector.init();

const timer = setInterval(() => {
    connector.loaded && disablePreloader();
}, 500);

function disablePreloader() {
    document.getElementById('preloader').classList.add('invisible');
    clearInterval(timer);
}

window.onload = () => {
    document.getElementById('update').onclick = async () => {
        const noun = await connector.getWord(SPEECH_PARTS.NOUN);
        const adj = await connector.getWord(SPEECH_PARTS.ADJ);
        console.log(noun + ' ' + adj);
    }
}

function rand(a, b) {
    return Math.floor(Math.random() * b) + a;
}

function getDictionaryUrl(word, token = TOKENS[0]) {
    return `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${token}&lang=ru-ru&text=${word}`;
}