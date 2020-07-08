const preloader = document.getElementById('preloader');

export function setPreloader(flag) {
  preloader.classList.remove('invisible');
  const timer = setInterval(() => {
    if (flag) {
      preloader.classList.add('invisible');
      clearInterval(timer);
    }
  }, 500);
}