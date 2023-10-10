const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth < 500 ? window.innerWidth : 450;
canvas.height = Math.min(canvas.parentElement.clientHeight, window.innerHeight); // Максимальна можлива висота

const renderSky = (ctx) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#87CEEB');
  gradient.addColorStop(1, '#00BFFF'); 
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
const player = new Player(0 + canvas.width/3, canvas.height/2-100, 47, 41, ctx);
const floors = [
  new Floor(0, canvas.height-76, 500, 76),
  new Floor(500, canvas.height-76, 500, 76),
]
const backgrounds = [
  new Background(0, 0, canvas.width, canvas.height),
  new Background(-canvas.width, 0, canvas.width, canvas.height),
]
const colliderCheck = () => {
  if(player.y - player.height/2 <= 0 && !player.moveBlock) {
    playAudio(audios.hit);
    player.moveBlock = true;
    player.velocity.y = 0;
  }
  floors.forEach(floor => {
    if(player.y+player.height/2 > floor.y && player.alive) {
      playAudio(audios.hit);
      player.alive = false;
      player.y = floor.y - player.height/2;
    }
  });
}
const words = [
  new Word(1, 200, 200, 100, 50, 'white', 20, 'black', 'white', 10),
]
const sentence = new Sentence('He ___ going to the gym now.', canvas.width/2, 30)
const animate = () => {
  canvas.height = Math.min(canvas.parentElement.clientHeight, window.innerHeight); // Максимальна можлива висота

  backgrounds.forEach(back => {
    back.update();
    back.draw(ctx);
  })
  floors.forEach(floor => {
    floor.update(player);
    floor.draw(ctx);
  })
  
  player.update();
  player.draw(ctx);
  
  words.forEach(word => {
    word.draw(ctx);
  })

  sentence.draw(ctx);

  colliderCheck();
  requestAnimationFrame(animate);
}

animate();


window.addEventListener('resize', () => {
  canvas.width = window.innerWidth < 500 ? window.innerWidth : 500;
  canvas.height = Math.min(canvas.parentElement.clientHeight, window.innerHeight);
});