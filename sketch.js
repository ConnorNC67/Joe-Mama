let spiller;
let aliens = [];
let bullets = [];
let alienBullets = [];
let alienImage
let spillerImage
let bakgrunnImage
let gameoverImage
let liv3Image
let liv2Image
let liv1Image
let menyImage
let gameover = false;
let meny = true;
let score = 0;
let level = 1;
let myStorage = window.localStorage;
let liv = 3;

function getHighscore() {
  return myStorage.getItem("highscore")
}

function setHighscore() {
  if (getHighscore() == null || parseInt(getHighscore()) < score) {
    myStorage.setItem("highscore", "" + score)
  }
}

function preload() {
  alienImage = loadImage(alienPNG);
  spillerImage = loadImage(spillerPNG);
  bakgrunnImage = loadImage(bakgrunnPNG);
  gameoverImage = loadImage(gameoverPNG);
  liv3Image = loadImage(liv3PNG);
  liv2Image = loadImage(liv2PNG);
  liv1Image = loadImage(liv1PNG);
  menyImage = loadImage(menyPNG);


}


function setupAliens() {
  gameover = false;
  aliens = [];
  alienBullets = [];
  for (let index = 0; index < 26; index++) {
    for (let rad = 0; rad < 4; rad++) {
      aliens.push(new Alien(50 + index * 50, 50 + rad * 50))
    }
  }
}

function setup() {
  createCanvas(1505, 668);
  spiller = new Spiller(710, 600);
  setupAliens();
}

function drawAliens() {
  let aliensKollidert = false;
  for (let index = 0; index < aliens.length; index++) {
    if (aliens[index].harKollidert()) {
      aliensKollidert = true;
    }
  }
  for (let index = aliens.length - 1; index >= 0; index--) {
    if (aliensKollidert) {
      aliens[index].snu();
    }

    if (aliens[index].pos.y >= 630) {
      gameover = true;
      level = 1;
      score = 0;
      live = 3;
      setTimeout(function() {
        console.log("TIMEOUT");
        setupAliens();
      }, 5000);

    }

    aliens[index].show();
    aliens[index].update();

    for (let indexb = bullets.length - 1; indexb >= 0; indexb--) {
      if (aliens[index].getCenter().dist(bullets[indexb].pos) < 20) {
        //aliens.splice(index, 1);
        //bullets.splice(indexb, 1);
        score += (level * 3);
        aliens[index].skalSlettes = true;
        bullets[indexb].skalSlettes = true;
      }
    }
  }
}

function drawBullets() {
  for (let index = bullets.length - 1; index >= 0; index--) {
    bullets[index].show();
    bullets[index].update();

    if (bullets[index].pos.y < 0) {
      //bullets.splice(index, 1);
      bullets[index].skalSlettes = true;
    }
  }
  for (let index = alienBullets.length - 1; index >= 0; index--) {
    alienBullets[index].show();
    alienBullets[index].update();

    if (alienBullets[index].pos.y > height) {
      //bullets.splice(index, 1);
      alienBullets[index].skalSlettes = true;
    }
  }
}

function slettFigurer() {
  for (let indexA = aliens.length - 1; indexA >= 0; indexA--) {
    if (aliens[indexA].skalSlettes) {
      aliens.splice(indexA, 1)
    }
  }

  for (let indexB = bullets.length - 1; indexB >= 0; indexB--) {
    if (bullets[indexB].skalSlettes) {
      bullets.splice(indexB, 1)
    }
  }
}

function drawLiv() {
  if (liv == 3) {
    image(liv3Image, width - 80, 20)
  } else if (liv == 2) {
    image(liv2Image, width - 80, 20)
  } else if (liv == 1) {
    image(liv1Image, width - 80, 20)
  }
}

function draw() {
  if (gameover) {
    background(0);
    background(gameoverImage);
  } else if (meny) {
    background(0);
    background(menyImage);
  } else {
    rectMode(CENTER);
    background(bakgrunnImage);

    spiller.show();
    spiller.update();
    if (spiller.isHit()) {
      if (liv == 1) {
        gameover = true
        meny = true;
        level = 1;
        score = 0;
        liv = 3;
        setTimeout(setupAliens, 5000)
      } else {
        liv--;

      }
    }

    drawAliens();
    drawBullets();
    drawLiv();

    fill(50, 205, 50)
    textSize(20)
    text("Poengsum: " + score, 20, 30)
    text("Nivå: " + level, 20, 60)
    text("Highscore: " + getHighscore(), 20, 90)
    setHighscore();


    slettFigurer();
    if (aliens.length == 0) {
      level++;
      setupAliens();
    }
  }


}

function keyPressed() {

  if (keyCode === UP_ARROW) {
    if (bullets.length <= 3) {
      bullets.push(new Bullet(spiller.pos.x + 25, spiller.pos.y, 10));
    }
  }

  if (key === 'a') {
    spiller.setHastighet(-4);
    spiller.setHastighetopp(0);
  }

  if (key === 'd') {
    spiller.setHastighet(4);
    spiller.setHastighetopp(0);
  }

  if (key === 'w') {
    spiller.setHastighetopp(-4)
    spiller.setHastighet(0);
  }

  if (key === 's') {
    spiller.setHastighetopp(4)
    spiller.setHastighet(0);

  }

  if (key === 'e') {
    spiller.setHastighetopp(-4)
    spiller.setHastighet(4);

  }
  if (key === 'q') {
    spiller.setHastighetopp(-4)
    spiller.setHastighet(-4);

  }
  if (key === 'x') {
    spiller.setHastighetopp(4)
    spiller.setHastighet(4);

  }
  if (key === 'z') {
    spiller.setHastighetopp(4)
    spiller.setHastighet(-4);

  }
  if (key === ' ') {
    spiller.setHastighet(0);
    spiller.setHastighetopp(0);
  }
  if (key === 'p') {
    meny = false
  }

}
