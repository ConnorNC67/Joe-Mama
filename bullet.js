class Bullet {
  constructor(x, y, speed, c) {
    this.pos = createVector(x, y);
    this.hastighet = speed;
    this.w = 5
    this.h = 15
    this.skalSlettes = false;
    this.c = c
  }

  setHastighet(hastighet) {
    this.hastighet = hastighet;

  }


  show() {
    fill(this.c);
    rect(this.pos.x, this.pos.y, this.w, this.h)
  }

  update() {
    this.pos.y -= this.hastighet;
  }
}
