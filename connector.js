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
  }

  getWord(word) {
    if (typeof word === 'string') {
      req.open("GET", getDictionaryUrl(word));
      req.send();
    }
  }
}

function a() {
  alert('asdasd')
}