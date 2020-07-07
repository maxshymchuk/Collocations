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
    document.getElementById('update').onclick = () => {
        //alert(JSON.stringify(connector.response));
        console.log(this.words)
    }
}

function getDictionaryUrl(word, token = tokens[0]) {
    return `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${token}&lang=ru-ru&text=${word}`;
}