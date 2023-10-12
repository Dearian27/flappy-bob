class Sentence {
  constructor(text, x, y, textAlign = 'center', fontSize = 20) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.textAlign = textAlign;
    this.fontSize = fontSize;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.textAlign = 'center';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    ctx.font = `${this.fontSize}px Retro`;
    ctx.fillStyle = "white";

    ctx.strokeText(this.text, this.textAlign === 'center' ? ctx.canvas.width / 2 : this.textAlign === 'right' ? ctx.canvas.width - ctx.measureText(this.text).width : 0, this.y); 
    ctx.fillText(this.text, this.textAlign === 'center' ? ctx.canvas.width / 2 : this.textAlign === 'right' ? ctx.canvas.width - ctx.measureText(this.text).width : 0, this.y); // Виведення тексту  
    

    // let words = this.text.split(' ');
    // let line = '';
    // let y = this.y;
    // for (let i = 0; i < words.length; i++) {
    //     let testLine = line + words[i] + ' ';
    //     let testWidth = ctx.measureText(testLine).width;

    //     if (testWidth > canvas.width) {
    //         ctx.strokeText(this.text, this.textAlign === 'center' ? ctx.canvas.width / 2 : this.textAlign === 'right' ? ctx.canvas.width - ctx.measureText(this.text).width : 0, y); 
    //         ctx.fillText(this.text, this.textAlign === 'center' ? ctx.canvas.width / 2 : this.textAlign === 'right' ? ctx.canvas.width - ctx.measureText(this.text).width : 0, y); // Виведення тексту  
    //         // ctx.fillText(line, x, y);
    //         line = words[i] + ' ';
    //         y += fontSize + 5;
    //     } else {
    //         line = testLine;
    //     }
    // }
   
   
  }
}