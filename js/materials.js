const background = new Image();
background.src = `../assets/Background${Math.ceil(Math.random() * 5)}.png`;

const tiles = new Image();
tiles.src = '../assets/tiles.png';

const bird = new Image();
bird.src = '../assets/bird.png';

const playerGap = 5;
const playerOffsets = [
  0,
  41 + playerGap,
  82 + playerGap*2
]
const playerOffsetY = playerOffsets[Math.floor(Math.random() * playerOffsets.length)];

const tilesOffsets = [
  0,
  38
]
const tilesOffsetY = tilesOffsets[Math.floor(Math.random() * tilesOffsets.length)];

const audios = {
  flap: new Audio('../assets/flap.mp3'),
  hit: new Audio('../assets/hit.mp3'),
  point: new Audio('../assets/point.mp3'),
  swoosh: new Audio('../assets/swoosh.mp3'),
}

const playAudio = (audio) => {
  audio.pause();
  audio.volume = 0.6;
  audio.currentTime = 0;
  audio.play();
}

const modal = document.getElementById('myModal');
const btn = document.getElementById('btn');

function openModal() {
  modal.classList.add('active');
  animateElement.beginElement();
}
function closeModal() {
  modal.classList.remove('active');
}
btn.addEventListener('click', () => {closeModal();init()});