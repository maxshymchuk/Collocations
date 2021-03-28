import { SPEECH_PARTS, GENDER } from '../models.js';
import { rand, get } from '../utils.js';

export default class Collocator {
  constructor() {
    this.words = [];
    this.currentGender;
  }

  isMale() {
    return GENDER[this.currentGender] === 'MALE';
  }

  isFemale() {
    return GENDER[this.currentGender] === 'FEMALE';
  }

  isNeutral() {
    return GENDER[this.currentGender] === 'NEUTRAL';
  }

  lastLetter(str) {
    return str[str.length - 1];
  }

  getGenderEnding(word, endings) {
    if (endings.length > 1) {
      if (this.isFemale()) {
        return endings[0];
      } 
      if (this.isNeutral()) {
        return endings[1];
      }
      const loudEndings = ['к', 'щ', 'ш', 'г'];
      return loudEndings.includes(this.lastLetter(word)) ? 'ий' : 'ый';
    } else {
      return endings[0]
    }
  }

  async _getWord(part) {
    const raw = await get(`assets/${part}s.txt`, (res) => this.words = res);
    const words = raw.split('\n');
    return this.random(words);
  }

  async _getNoun() {
    const word = await this._getWord(SPEECH_PARTS.NOUN);
    const splitted = word.split(' ');
    this.currentGender = splitted[1].toUpperCase();
    return splitted[0];
  }

  async _getAdj() {
    const word = await this._getWord(SPEECH_PARTS.ADJ);
    const splitted = word.split(' ');
    const additionalEndings = splitted[1].split('/');
    const adjWithoutEnding = splitted[0].substr(0, splitted[0].length - 2);
    const ending = this.getGenderEnding(adjWithoutEnding, additionalEndings);
    const adjective = adjWithoutEnding + ending;
    return adjective;
  }

  async getCollocation() {
    const noun = await this._getNoun();
    const adjective = await this._getAdj();
    return {
      noun, adjective
    }
  }

  random(array) {
    return array[rand(0, array.length)];
  }
}