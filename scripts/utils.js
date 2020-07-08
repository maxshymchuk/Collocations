import { TOKENS } from './config.js';

export function rand(a, b) {
  return Math.floor(Math.random() * b) + a;
}

export function getDictionaryUrl(word, token = TOKENS[rand(0, TOKENS.length)]) {
  return `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${token}&lang=ru-ru&text=${word}`;
}