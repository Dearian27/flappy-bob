class Sentence {
  constructor(text, x, y, textAlign = 'center') {
    this.text = text;
    this.x = x;
    this.y = y;
    this.textAlign = textAlign;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.textAlign = 'center';
    ctx.font = '20px Retro'; // Встановлення розміру та шрифта
    ctx.fillStyle = "white";
    ctx.fillText(this.text, this.textAlign === 'center' ? ctx.canvas.width / 2 : this.textAlign === 'right' ? ctx.canvas.width - ctx.measureText(this.text).width : 0, this.y); // Виведення тексту
  }
}