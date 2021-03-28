export function rand(a, b) {
  return Math.floor(Math.random() * (b - a)) + a;
}

export function get(url) {
  return new Promise(function (resolve) {
    const req = new XMLHttpRequest();
    req.onload = () => resolve(req.response);
    req.open('GET', url, true);
    req.send(null);
  })
}

export function copy(id) {
  if (document.selection) {
    const range = document.body.createTextRange();
    range.moveToElementText(document.getElementById(id));
    range.select().createTextRange();
    document.execCommand("copy");
  } else if (window.getSelection) {
    const range = document.createRange();
    range.selectNode(document.getElementById(id));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
  }
}