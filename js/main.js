function lockLandscapeOrientation() {
  if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock('landscape');
  }
}
console.log('lockLandscapeOrientation')
// Викликаємо функцію для блокування орієнтації при завантаженні сторінки
window.onload = () => {
  lockLandscapeOrientation();
}

