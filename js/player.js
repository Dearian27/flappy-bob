class Player {
  constructor(x, y, width, height, ctx) { 
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height; 
    this.alive = null;
    this.moveBlock = false;
    this.controls = new Controls(ctx);
    this.velocity = {
      x: 0,
      y: 0
    }
    this.animation = {
      frame: 0,
      frameDelay: 0,
      maxframeDelays: 10,
      maxframeActiveDelays: 5,
      maxFrames: 4,
      activeAnim: false,
    }
    this.rotation = 0;
  } 
  update() {
    if(this.alive && this.activeAnim) {
      this.animation.frameDelay++;
      if(this.animation.frameDelay >= this.animation.maxframeActiveDelays) {
        this.animation.frameDelay = 0;
        this.animation.frame++;
        if(this.animation.frame === this.animation.maxFrames) {
          this.animation.frame = 0;
          this.activeAnim = false;
        }
      }
    } else if(this.alive === null) {
      this.animation.frameDelay++;
      if(this.animation.frameDelay >= this.animation.maxframeDelays) {
        this.animation.frameDelay = 0;
        this.animation.frame++;
        if(this.animation.frame === this.animation.maxFrames) {
          this.animation.frame = 0;
        }
      }
    }
    if(this.alive !== null) {
      if(this.controls.flap && !this.moveBlock) {
        playAudio(audios.flap);
        this.activeAnim = true;
        this.controls.flap = false;
        this.velocity.y = -8;
      }
      if(this.alive) this.velocity.y+=0.5;
      else this.velocity.y = 0;
      this.y += this.velocity.y;
      this.x += this.velocity.x;
    }else if(this.controls.flap && this.alive === null) {
      this.alive = true;
    }
  }
  draw(ctx) {
    if(this.alive) this.rotation = this.velocity.y*2;
    ctx.save();
    ctx.translate(Math.round(this.x), Math.round(this.y));
    ctx.rotate(this.rotation * Math.PI / 180);
    ctx.drawImage(bird, this.animation.frame * 47 + this.animation.frame * playerGap, 0 + playerOffsetY, 47, 41, Math.round(-this.width/2), Math.round(-this.height/2), this.width, this.height);
    ctx.restore();
  
    // ctx.drawImage(bird, this.animation.frame * 47, 0 + playerOffsetY, 47, 41, Math.round(this.x - this.width/2), Math.round(this.y - this.height/2), this.width, this.height);
  }
}