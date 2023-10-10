class Background {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  
  update() {
    this.x+=0.25;
    if(this.x >= this.width) {
      this.x = -this.width;
    }
  }

  draw(ctx) {
    ctx.drawImage(background, this.x, this.y, this.width, this.height);
  }
}