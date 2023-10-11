class PlayerDeath {
  constructor(x, y, width, height, velocityY, rotation) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rotationSpeed = Math.floor(Math.random() * 5 + 5);
    this.angle = rotation;
    this.velocity = {
      x: 1,
      y: velocityY
    }
  }
  draw() {
    this.x += this.velocity.x;
    this.velocity.y += 0.5
    this.y += this.velocity.y;
    this.angle += this.rotationSpeed;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle / 180 * Math.PI);
    ctx.drawImage(bird, 2 * 47 + 2 * playerGap, 0 + playerOffsetY, 47, 41, Math.round(-this.width/2), Math.round(-this.height/2), this.width, this.height);
    ctx.restore();
  }
}