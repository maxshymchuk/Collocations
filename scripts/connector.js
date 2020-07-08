import { WORDS, settings } from './config.js';
import { APP_MODE } from './models.js';
import { rand, getDictionaryUrl } from './utils.js';

export default class Connector {
  constructor() {
    this.loaded = settings.mode === APP_MODE.DEV;
    if (settings.mode === APP_MODE.PROD) {
      const req = new XMLHttpRequest();
      req.onload = () => {
        if (req.status === 200) {
          this.words = req.response;
          this.loaded = true;
        } else {
          alert('Connector cannot load data');
        }
      }
      req.open("GET", 'assets/words.txt');
      req.send();
    }
    if (settings.mode === APP_MODE.DEV) {
      this.words = WORDS;
    }
  }

  getDescription(word) {
    return new Promise((resolve, reject) => {
      if (typeof word === 'string') {
        const req = new XMLHttpRequest();
        req.open("GET", getDictionaryUrl(word));
        req.onload = () => {
          if (req.status === 200) {
            resolve(req.response);
          } else {
            reject({
              status: req.status,
              statusText: req.statusText
            });
          }
        }
        req.send();
      }
    });
  }

  async getWord(part) {
    let isFound = false;
    while (!isFound) {
      const response = await this.getDescription(this.random());
      const word = JSON.parse(response);
      if (word['def'].length && word['def'][0]['pos'] === part) {
        isFound = true;
        return word['def'][0]['text'];
      }
    }
  }

  random() {
    if (this.words) {
      const list = settings.mode === APP_MODE.PROD ? this.words.split('\r\n') : this.words;
      return list[rand(0, list.length)];
    }
  }
}