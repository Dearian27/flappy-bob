class Background {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  
  update(ctx) {
    if(player)this.x += 0.25;
    if(this.x >= backsCount * this.width - this.width) {
      this.x -= backsCount * this.width;
    }
  }

  draw(ctx) {
    ctx.drawImage(background, Math.round(this.x), this.y, this.width, this.height);
  }
}