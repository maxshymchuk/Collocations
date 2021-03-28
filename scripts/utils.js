export function rand(a, b) {
  return Math.floor(Math.random() * b) + a;
}

export function get(url) {
  return new Promise(function (resolve) {
    const req = new XMLHttpRequest();
    req.onload = () => resolve(req.response);
    req.open('GET', url, true);
    req.send(null);
  })
}