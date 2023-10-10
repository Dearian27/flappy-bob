class Floor {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  
  update() {
    this.x-=1;
    
    if(this.x <= -500) {
      this.x = 500;
    }
  }

  draw(ctx) {
    ctx.drawImage(tiles, 0, 0 + tilesOffsetY, 250, 38, this.x, this.y, this.width, this.height);
  }
}