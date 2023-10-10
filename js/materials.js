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
  flap: '../assets/flap.mp3',
  hit: '../assets/hit.mp3',
  point: '../assets/point.mp3',
  swoosh: '../assets/swoosh.mp3',
}

const playAudio = (src) => {
  const audio = new Audio();
  audio.src = src;
  audio.volume = 0.6;
  audio.play();
}