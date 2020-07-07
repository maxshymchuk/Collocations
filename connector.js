class Connector {
  constructor() {
    this.loaded = false;
    this.connector = new XMLHttpRequest();
    this.connector.onload = () => {
      if (this.connector.status != 200) {
        alert('Error');
      } else {
        this.response = this.connector.response;
        this.loaded = true;
      }
    }
  }

  init() {
    this.connector.open("GET", 'words.txt');
    this.connector.send();
    const timer = setInterval(() => {
      if (this.response) {
        this.words = this.response;
        clearInterval(timer);
      }
    }, 100);
  }

  getWord(word) {
    if (typeof word === 'string') {
      req.open("GET", getDictionaryUrl(word));
      req.send();
    }
  }

  random() {
    if (this.words) {
      const list = this.words.split('\r\n');
      return list[rand(0, list.length - 1)];
    }
  }
}