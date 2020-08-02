export function generateCover(ctxs: CanvasRenderingContext2D[]) {
  // https://codepen.io/RussellDaley/pen/lgvds?editors=1010
  const colors = ['red', 'orange', 'yellow', 'lime', 'green', 'teal', 'blue', 'purple'];

  //chose a number between 0 and 7
  const randomNumber = Math.floor(Math.random() * colors.length);
  let randomNumber2 = Math.floor(Math.random() * colors.length);

  //when the 2 random Numbers equal the same it creates another randomNumber2
  if (randomNumber === randomNumber2) {
    randomNumber2 = randomNumber + 1;
  } else if (randomNumber === 7 && randomNumber2 === 7) {
    randomNumber2 = randomNumber - 1;
  }
  ctxs.forEach((ctx) => {
    ctx.save();
    const fillColor = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);
    fillColor.addColorStop(0, colors[randomNumber]); //starting corner
    fillColor.addColorStop(1, colors[randomNumber2]); //ending Corner
    ctx.fillStyle = fillColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
  });
}
