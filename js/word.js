class Word {
  constructor(id, x, y, width, height, text, fontSize, fontColor, bgColor, cornerRadius) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.fontSize = fontSize;
    this.fontColor = fontColor;
    this.bgColor = bgColor;
    this.cornerRadius = cornerRadius;
    this.style = 'default';
    this.triangleHeight = 10;
    this.triangleBase = 15;
    this.widthChanged = false;

    this.anim = 'fadeIn';
    this.opacity = 0;
    this.active = true;
    this.yOffset = 0;
  }
  widthChange(ctx) {
    ctx.font = `${this.fontSize}px Retro`;
    let newWidth = ctx.measureText(this.text).width + 42;
    if(newWidth > this.width) {
      this.width = newWidth;
    }
    this.widthChanged = true;
  }
  draw(ctx) {
    if(this.anim === 'fadeIn') {
      this.opacity += 0.05;
      if(this.opacity >= 1) {
        this.opacity = 1;
        this.anim = null;
      }
    } else if(this.anim === 'fadeOut') {
      this.yOffset -= 0.25;
      this.opacity -= 0.05;
      if(this.opacity <= 0) {
        this.opacity = 0;
        this.anim = null;
      }
    }

    if(player) {
      this.x -= 2;
    }

    if(!this.widthChanged) {
      this.widthChange(ctx);
    }
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;

    ctx.fillStyle = this.bgColor;
    ctx.beginPath();
    ctx.translate(0, this.yOffset);
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
    ctx.stroke();
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
    ctx.fillText(this.text, this.x, this.y + this.height / 2);
    ctx.restore();
  }
}