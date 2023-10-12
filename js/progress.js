class Progress {
  constructor(text, x, y, paddingTop = 120, fontSize) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.paddingTop = paddingTop;
    this.fontSize = fontSize;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.textAlign = 'center';
    ctx.font = `${this.fontSize}px Retro`;
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 4;

    ctx.save();
    // ctx.strokeText(this.text, ctx.canvas.width / 2, ctx.canvas.height / 2 - 200); 
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = "white";
    ctx.fillText(this.text, ctx.canvas.width / 2, this.paddingTop);
    ctx.restore();
  }
}