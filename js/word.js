class Word {
  constructor(id, x, y, width, height, message, fontSize, fontColor, bgColor, cornerRadius) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.message = message;
    this.fontSize = fontSize;
    this.fontColor = fontColor;
    this.bgColor = bgColor;
    this.cornerRadius = cornerRadius;
    this.style = 'default';
    this.triangleHeight = 10;
    this.triangleBase = 15;
    this.widthChanged = false;
  }
  widthChange(ctx) {
    ctx.font = `${this.fontSize}px Retro`;
    let newWidth = ctx.measureText(this.message).width + 42;
    if(newWidth > this.width) {
      this.width = newWidth;
    }
    this.widthChanged = true;
  }
  draw(ctx) {
    if(!this.widthChanged) {
      this.widthChange(ctx);
    }
    ctx.fillStyle = this.bgColor;
    ctx.beginPath();
    ctx.moveTo(this.x - this.width/2 + this.cornerRadius, this.y);
    ctx.lineTo(this.x - this.width/2 + this.width - this.cornerRadius, this.y);
    ctx.arcTo(this.x - this.width/2 + this.width, this.y, this.x - this.width/2 + this.width, this.y + this.cornerRadius, this.cornerRadius);
    ctx.lineTo(this.x - this.width/2 + this.width, this.y + this.height - this.cornerRadius);
    ctx.arcTo(this.x - this.width/2 + this.width, this.y + this.height, this.x - this.width/2 + this.width - this.cornerRadius, this.y + this.height, this.cornerRadius);
    ctx.lineTo(this.x - this.width/2 + this.cornerRadius, this.y + this.height);
    ctx.arcTo(this.x - this.width/2, this.y + this.height, this.x - this.width/2, this.y + this.height - this.cornerRadius, this.cornerRadius);
    ctx.lineTo(this.x - this.width/2, this.y + this.cornerRadius);
    ctx.arcTo(this.x - this.width/2, this.y, this.x - this.width/2 + this.cornerRadius, this.y, this.cornerRadius);
    ctx.closePath();
    ctx.fill();

    ctx.font = `${this.fontSize}px Retro`;
    if(this.style === 'default') {
      ctx.fillStyle = this.fontColor;
    } else if(this.style === 'right') {
      ctx.fillStyle = 'lightgreen';
    } else if(this.style === 'wrong') {
      ctx.fillStyle = 'tomato';
    }
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.message, this.x, this.y + this.height / 2);
  }
}