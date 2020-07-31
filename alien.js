class Alien {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.hastighet = 1 + (level / 5);
    this.w = 40
    this.h = 40
    this.skalSlettes = false;
  }

  getCenter() {
    return createVector(this.pos.x + this.w / 2, this.pos.y + this.h / 2);
  }
  setHastighet(hastighet) {
    this.hastighet = hastighet;

  }

  snu() {
    this.hastighet *= -1;
    this.pos.y += 15;
  }

  harKollidert() {
    if (this.hastighet > 0 && this.pos.x > width - 35) {
      return true;
    }

    if (this.hastighet < 0 && this.pos.x < 0) {
      return true;
    }

    return false;
  }

  show() {
    fill(50, 205, 50);
    //rect(this.pos.x, this.pos.y, this.w, this.w)
    image(alienImage, this.pos.x, this.pos.y);
  }

  update() {
    if (random(1000) < 0.1 + level / 5) {
      alienBullets.push(new Bullet(this.pos.x, this.pos.y, -4))
    }

    this.pos.x += this.hastighet;
  }

}
