const FEED_URL = 'wallpapers.json';
const container = document.getElementById('wallpaper-container');
const refreshBtn = document.getElementById('refreshBtn');

let wallpapers = [];
let loadedCount = 0;
const batchSize = 10; // number of wallpapers to load per batch

async function fetchWallpapers() {
  try {
    const res = await fetch(FEED_URL);
    wallpapers = await res.json();
  } catch(e) {
    wallpapers = [];
  }
  loadedCount = 0;
  container.innerHTML = '';
  loadMoreWallpapers();
}

function loadMoreWallpapers() {
  if (loadedCount >= wallpapers.length) return;
  const nextBatch = wallpapers.slice(loadedCount, loadedCount + batchSize);
  nextBatch.forEach(url => {
    const img = document.createElement('img');
    img.src = url + '?auto=format&fit=crop&w=800&q=80';
    img.loading = 'lazy';
    img.className = 'tile';
    container.appendChild(img);
  });
  loadedCount += nextBatch.length;
}

window.addEventListener('scroll', () => {
  if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 150)) {
    loadMoreWallpapers();
  }
});

refreshBtn.addEventListener('click', fetchWallpapers);

// Initial load
fetchWallpapers();
