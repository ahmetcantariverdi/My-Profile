window.addEventListener("load", function () {
  const toast1 = new bootstrap.Toast(document.getElementById('toast1'));
  const toast2 = new bootstrap.Toast(document.getElementById('toast2'));

  toast1.show();

  setTimeout(() => {
    toast2.show();
  }, 3000);

  initToastTimes();
});

function timeAgo(date) {
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);

  if (diff < 10) return "şimdi";
  if (diff < 60) return diff + " sn önce";

  const min = Math.floor(diff / 60);
  if (min < 60) return min + " dk önce";

  const hour = Math.floor(min / 60);
  if (hour < 24) return hour + " saat önce";

  const day = Math.floor(hour / 24);
  return day + " gün önce";
}

// toast time
function initToastTimes() {
  const toasts = document.querySelectorAll('.toast');

  toasts.forEach((toast, index) => {
    const timeEl = toast.querySelector('.time');
    const key = "toast-time-" + index;

    let savedTime = localStorage.getItem(key);

    if (!savedTime) {
      savedTime = new Date().toISOString();
      localStorage.setItem(key, savedTime);
    }

    toast.dataset.time = savedTime;

    function update() {
      const date = new Date(toast.dataset.time);
      timeEl.textContent = timeAgo(date);
    }

    update();
    setInterval(update, 60000);
  });
}

//! nite mode

const pill     = document.getElementById('pill');
const wrap     = document.getElementById('wrap');
const moonPath = document.getElementById('moonPath');
const KEY      = 'theme';
let night = false;

function applyTheme(Night) {
  night = Night;

  pill.classList.toggle('night', Night);
  pill.classList.toggle('day', !Night);

  wrap.classList.toggle('moon-night', Night);

  if (moonPath) {
    moonPath.setAttribute('stroke', Night ? '#FAC775' : '#888780');
  }

  document.body.classList.toggle('night-mode', Night);

  localStorage.setItem(KEY, Night ? 'night' : 'day');
}

pill.addEventListener('click', () => applyTheme(!night));

const saved = localStorage.getItem(KEY);
const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

applyTheme(saved ? saved === 'night' : sysDark);

window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', e => {
    if (!localStorage.getItem(KEY)) applyTheme(e.matches);
  });