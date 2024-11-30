function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

window.addEventListener("message", (e) => {
  console.log(event.origin, "solution-school.com.ua");
  console.log(event.origin.includes("solution-school.com.ua"));
  if (
    event.origin !== "https://www.solution-school.com.ua"
    // event.origin !== "https://solution-english-school.vercel.app" ||
    // !event.origin.includes("solution-school.com.ua")
  ) {
    return;
  }
  if (!gameIsStarted) {
    gameIsStarted = true;
    let data = e.data;
    data = data.map((question) => {
      let rightVariant = question.variants.find(
        (variant) => variant.isRight === true
      );
      let limitedVariants = question.variants.filter(
        (variant) => !variant.isRight
      );
      if (limitedVariants.length > 2) {
        limitedVariants = limitedVariants.slice(0, 2);
      }

      return {
        ...question,
        variants: [...shuffleArray([...limitedVariants, rightVariant])],
      };
    });
    startGame(data);
  }
});
