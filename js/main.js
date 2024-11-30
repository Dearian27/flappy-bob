const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// canvas.width = window.innerWidth < 500 ? window.innerWidth : 450;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; // Максимальна можлива висота
const animateElement = document.getElementById("startAnimation"); // Замініть на ваш ID анімації
let currentQuestion = 0;
// let questions = [
//   {
//     question: "She ___ cooking now.",
//     answer: "She is cooking now.",
//     variants: [
//       { isRight: true, text: "is" },
//       { isRight: false, text: "are" },
//       { isRight: false, text: "am" },
//     ],
//   },
//   {
//     question: "___ they playing the piano at the moment?",
//     answer: "Are they playing the piano at the moment?",
//     variants: [
//       { isRight: false, text: "is" },
//       { isRight: false, text: "am" },
//       { isRight: true, text: "are" },
//     ],
//   },
//   {
//     question: "Mary and Jack are not ___ now.",
//     answer: "Mary and Jack are not talking now.",
//     variants: [
//       { isRight: true, text: "talking" },
//       { isRight: false, text: "talks" },
//     ],
//   },
//   {
//     question: "___ we ___ exercises at the moment?",
//     answer: "Are we doing exercises at the moment?",
//     variants: [
//       { isRight: true, text: "are/doing" },
//       { isRight: false, text: "are/do" },
//     ],
//   },
//   {
//     question: "Sam isn't ___ English at the moment.",
//     answer: "Sam isn't learning English at the moment.",
//     variants: [
//       { isRight: true, text: "learning" },
//       { isRight: false, text: "learns" },
//     ],
//   },
// ];
let player = new Player(
  0 + canvas.width / 3,
  canvas.height / 2 - 100,
  47,
  41,
  ctx
);
let playerDeath = null;
let floors = [];
let backgrounds = [];
let words = [];

const shuffle = () => {
  questions = shuffleArray(questions);
  questions.forEach((question) => {
    question.variants = shuffleArray(question.variants);
  });
};
// shuffle();

let progress = new Progress(
  `${currentQuestion + 1}/${questions.length}`,
  canvas.width / 2,
  canvas.height / 2,
  window.innerWidth > 670 ? 120 : 80,
  window.innerWidth > 670 ? 84 : 50
);
let sentence;

const colliderCheck = () => {
  if (player) {
    const activeWords = words.filter((word) => word.active);
    activeWords.forEach((word) => {
      if (
        player?.y - player?.height / 2 <= word.y + word.height &&
        player?.y + player?.height / 2 >= word.y &&
        player?.x + player?.width / 2 >= word.x - word.width / 2 &&
        player?.x - player?.width / 2 <= word.x + word.width / 2
      ) {
        const right = questions[currentQuestion].variants.find(
          (v) => v.isRight === true
        );
        if (right.text === word.text && word.active) {
          word.active = false;
          word.style = "right";
          playAudio(audios.point);
          word.anim = "fadeOut";
          // sentence.text = questions[currentQuestion].answer;
          if (questions.length - 1 !== currentQuestion) {
            currentQuestion++;
            progress.text = `${currentQuestion + 1}/${questions.length}`;
          } else {
            gameIsStarted = false;
            window.top.postMessage({ status: "success" }, "*");
            // openModal();
          }
          setTimeout(() => {
            sentence.text = questions[currentQuestion].question;
          }, 1400);
        } else {
          word.style = "wrong";
          playAudio(audios.hit);
          if (!playerDeath) {
            playerDeath = new PlayerDeath(
              player.x,
              player.y,
              player.width,
              player.height,
              -10,
              player.rotation
            );
            player = null;
            setTimeout(() => {
              init();
            }, 2000);
            return;
          }
        }
      }
    });
    if (player?.y - player?.height / 2 <= 0) {
      // playAudio(audios.hit);
      // if(!playerDeath) {
      //   playerDeath = new PlayerDeath(player.x, player.y, player.width, player.height, 0, player.rotation);
      //   player = null;
      //   setTimeout(() => {
      //     init();
      //   }, 2000)
      // }
      // return;
      player.y = 0 + player.height / 2;
    }
    floors.forEach((floor) => {
      if (player?.y + player?.height / 2 > floor.y - 30 && player?.alive) {
        // playAudio(audios.hit);
        // if(!playerDeath) {
        //   playerDeath = new PlayerDeath(player.x, floor.y - player.height/2, player.width, player.height, -7, player.rotation);
        //   player = null;
        //   setTimeout(() => {
        //     init();
        //   }, 2000)
        //   return;
        // }
        player.controls.flap = true;
        player.y = floor.y - 30 - player.height / 2;
      }
    });
  }
};

const wordSpawn = () => {
  const text =
    questions[currentQuestion].variants[
      Math.floor(Math.random() * questions[currentQuestion].variants.length)
    ].text;
  words.push(
    new Word(
      1,
      canvas.width / 2 + 200,
      (canvas.height - 76) / 2 - 25 + (Math.random() * 380 - 210),
      100,
      50,
      text,
      20,
      "black",
      "white",
      10
    )
  );
};
let spawnerTimer = setInterval(() => {
  if (words.length > 15) {
    words.shift();
  }
  if (player?.alive) wordSpawn();
}, 1500);

const animate = () => {
  if (!gameIsStarted) {
    return;
  }
  canvas.height = window.innerHeight;

  backgrounds.forEach((back) => {
    back.update(ctx);
    back.draw(ctx);
  });
  floors.forEach((floor) => {
    floor.update(ctx);
    floor.draw(ctx);
  });

  if (player) {
    player.update();
    player.draw(ctx);
  } else {
    playerDeath.draw(ctx);
  }
  if (!player) {
    words.forEach((word) => {
      word.anim = "fadeOut";
    });
    setTimeout(() => {
      words = [];
    }, 1100);
  }
  sentence?.draw(ctx);
  progress.draw(ctx);

  words.forEach((word) => {
    word.draw(ctx);
  });

  colliderCheck();

  requestAnimationFrame(animate);
};

const init = () => {
  gameIsStarted = true;
  currentQuestion = 0;
  player = new Player(
    0 + canvas.width / 3,
    canvas.height / 2 - 100,
    47,
    41,
    ctx
  );
  playerDeath = null;
  shuffle();
  sentence = new Sentence(
    questions[currentQuestion].question,
    canvas.width / 2,
    30,
    "center",
    window.innerWidth > 670 ? 20 : window.innerWidth > 480 ? 16 : 12
  );
  progress = new Progress(
    `${currentQuestion + 1}/${questions.length}`,
    canvas.width / 2,
    canvas.height / 2,
    window.innerWidth > 670 ? 120 : 80,
    window.innerWidth > 670 ? 84 : 50
  );
  floors = [];
  backgrounds = [];
  for (let i = 1; i <= backsCount; i++) {
    backgrounds.push(
      new Background(
        canvas.width - canvas.height * i,
        0,
        canvas.height,
        canvas.height
      )
    );
  }
  for (let i = 0; i < floorsCount; i++) {
    floors.push(new Floor(0 + 500 * i, canvas.height - 76, 500, 76));
  }
  clearInterval(spawnerTimer);
  words = [];
  animate();

  spawnerTimer = setInterval(() => {
    if (words.length > 15) {
      words.shift();
    }
    if (player?.alive && gameIsStarted) wordSpawn();
  }, 1500);
  // console.log(backgrounds, floors, words);
};

const startGame = (data) => {
  questions = data;
  init();
};

const backsCount = Math.ceil(canvas.width / canvas.height) + 1;
for (let i = 1; i <= backsCount; i++) {
  backgrounds.push(
    new Background(
      canvas.width - canvas.height * i,
      0,
      canvas.height,
      canvas.height
    )
  );
}
const floorsCount = Math.ceil(canvas.width / 500) + 1;
for (let i = 0; i < floorsCount; i++) {
  floors.push(new Floor(0 + 500 * i, canvas.height - 76, 500, 76));
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
