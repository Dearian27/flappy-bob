class Floor {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  
  update(ctx) {
    if(player) this.x-=2;
    if(this.x <= -this.width) {
      this.x = (floorsCount-1) * 500;
    }
  }

  draw(ctx) {
    ctx.drawImage(tiles, 0, 0 + tilesOffsetY, 250, 38, this.x, this.y, this.width, this.height);
  }
}