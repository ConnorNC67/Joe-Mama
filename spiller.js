class Spiller {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.hastighet = 0;
    this.hastighetopp = 0;
    this.w = 60
    this.h = 60
  }

  getCenter() {
    return createVector(this.pos.x + this.w / 2, this.pos.y + this.h / 2);
  }


  setHastighet(hastighet) {
    this.hastighet = hastighet;

  }

  setHastighetopp(hastighetopp) {
    this.hastighetopp = hastighetopp;
  }

  show() {
    fill(255);
    //rect(this.pos.x, this.pos.y, 50, 50)
    image(spillerImage, this.pos.x, this.pos.y);
  }

  isHit() {
    let hit = false

    for (let index = alienBullets.length - 1; index >= 0; index--) {
      if (this.getCenter().dist(alienBullets[index].pos) < 30) {
        hit = true;
        alienBullets.splice(index, 1)
      }
    }

    return hit;
  }

  update() {
    if (this.hastighet > 0 && this.pos.x > width - 50) {
      this.hastighet = 0
    }

    if (this.hastighet < 0 && this.pos.x < 0) {
      this.hastighet = 0
    }

    if (this.hastighetopp > 0 && this.pos.y > height - 50) {
      this.hastighetopp = 0
    }

    if (this.hastighetopp < 0 && this.pos.y < 0) {
      this.hastighetopp = 0

    }



    this.pos.x += this.hastighet;
    this.pos.y += this.hastighetopp;
  }
}
