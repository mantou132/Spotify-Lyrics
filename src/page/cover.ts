export function generateCover(ctxs: CanvasRenderingContext2D[]) {
  const colors = ['red', 'orange', 'yellow', 'lime', 'green', 'teal', 'blue', 'purple'];
  const getColor = () => colors.splice(Math.floor(Math.random() * colors.length), 1)[0];
  ctxs.forEach((ctx) => {
    ctx.save();
    const fillColor = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);
    fillColor.addColorStop(0, getColor());
    fillColor.addColorStop(1, getColor());
    ctx.fillStyle = fillColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
  });
}
