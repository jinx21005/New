const container = document.getElementById('wallpaper-container');
let page = 1;
let loading = false;

const FEED_URL = 'https://cb72c345-40e0-4026-b798-ef65d85471f9-00-nb1sx8ei6h7l.pike.replit.dev:3000/api/wallpapers?page=';

async function loadWallpapers() {
  if (loading) return;
  loading = true;

  try {
    const res = await fetch(FEED_URL + page);
    const wallpapers = await res.json();

    wallpapers.forEach(url => {
      const img = document.createElement('img');
      img.src = url;
      img.alt = "Wallpaper";
      img.className = "wallpaper-img";
      container.appendChild(img);
    });

    page++;
  } catch (e) {
    console.error('Failed to load wallpapers', e);
  }

  loading = false;
}

// Load initial wallpapers
loadWallpapers();

// Infinite scroll
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
    loadWallpapers();
  }
});
