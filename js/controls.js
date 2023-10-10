class Controls {
  constructor(ctx) {
    this.readyForFlap = true;
    this.flap = false;
    document.onkeydown = (event) => {
      if(event.key === ' ') {
        if(this.readyForFlap) {
          this.flap = true;
          this.readyForFlap = false;
          setTimeout(() => {
            this.readyForFlap = true;
          }, 100)
        }
      }
    }
    ctx.canvas.onmousedown = () => {
      if(this.readyForFlap) {
        this.flap = true;
        this.readyForFlap = false;
        setTimeout(() => {
          this.readyForFlap = true;
        }, 100)
      }
    }
  }
} 