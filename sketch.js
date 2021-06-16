let walls = [];
let ray;
let particle;

// **********************for self movement**********************

let xoff = 0;
let yoff = 10000;

// **********************for self movement**********************


function setup() {
  let div = createCanvas(1000, 400);
  div.position(200, 100);

  // for(let i=0; i<5; i++)
  // {
  //   let x1 = random(400);
  //   let x2 = random(400);
  //   let y1 = random(400);
  //   let y2 = random(400);
  //   walls[i] = new Boundary(x1, y1, x2, y2);
  // }
  let card = createDiv('I am fan of Data Visualization, I always wanted to see how any other object observe things with respect to there height. Like An Elephant Vision, just imagine how we appear in there eyes. This is an Object Visualizer and it shows you images which a object identify with respect to there size and distance between object and the wall. How to use: 1. For forward and Backword direction use mouse, 2. For left direction use <- Arrow Button, 3. For right direction use -> Arrow Button. Now Click this text to start');
  card.addClass('demo-card-wide mdl-card mdl-shadow--2dp pos mdl-card__title');
  walls[0] = new Boundary(50, 50, 220, 50);
  walls[1] = new Boundary(280, 50, 450, 50);

  walls[2] = new Boundary(100, 130, 380, 130);

  // left wall
  walls[3] = new Boundary(50, 50, 50, 350);
  walls[4] = new Boundary(100, 130, 100, 280);

  // lower wall
  walls[5] = new Boundary(50, 350, 450, 350);
  walls[6] = new Boundary(100, 280, 380, 280);

  // right wall
  walls[7] = new Boundary(450, 50, 450, 350);
  walls[8] = new Boundary(380, 130, 380, 170);
  walls[9] = new Boundary(380, 240, 380, 280);

  // walls[1] = new Boundary(280, 50, 450, 50);

  // walls[6] = new Boundary(400, 400, 400, 400);
  // ****************for the ray casting to boundary sides************************

  //
  walls[10] = (new Boundary(1, 1, 500, 1));
  walls[11] = (new Boundary(500, 0, 500, 500));
  walls[12] = (new Boundary(1, 500, 1, 1));
  walls[13] = (new Boundary(498, 398, 1, 398));

  //
  //
  // walls.push(new Boundary(0, 0, 500, 0));
  // walls.push(new Boundary(500, 0, 500, 500));
  // walls.push(new Boundary(500, 500, 0, 500));
  // walls.push(new Boundary(0, 500, 0, 0));

  // ****************for the ray casting to boundary sides************************

  particle = new Particle();
  // let button = createButton('click me');
  //  // button.position(19, 19);
  // button.mousePressed(particle.move(mouseX, mouseY));
  // ray = new Ray(100, 200);
  // button =
}

function mousePressed() {
  removeElements(); // this will remove the div and p, not canvas
}

function keyPressed() {
  if (keyIsDown(LEFT_ARROW)) {
    particle.rotate(-0.2);
  } else if (keyIsDown(RIGHT_ARROW)) {
    particle.rotate(+0.2);
  }
  // else if(key == 'w')
  // {
  //   particle.move(1);
  // }
  // else if(key == 's')
  // {
  //   particle.move(-1);
  // }
}

function draw() {
  background(0);
  cursor('grab');
  for (let wall of walls) {
    wall.show();
  }

  // function pilot()
  // {
  // particle.update(mouseX, mouseY);
  // }


  // **********************for moving our car with mouse**********************
  particle.update(mouseX, mouseY);
  // **********************for moving our car with mouse**********************


  // **********************for self movement**********************
  // particle.update(noise(xoff)*width, noise(yoff)*height);
  // **********************for self movement**********************


  particle.show();

  xoff += 0.01;
  yoff += 0.01;

  var visuals = particle.look(walls);
  const screen_width = 500 / visuals.length;
  // push is used to start a new drawing state
  push();
  // amount to displace objects within the display window translate();
  translate(500, 0);
  for (var i = 0; i < visuals.length; i++) {
    noStroke();
    const b = map(visuals[i] * visuals[i], 0, 500 * 500, 255, 0);
    const h = map(visuals[i], 0, 500, 500, 0);
    fill(b);
    rectMode(CENTER);
    rect(i * screen_width + screen_width / 2, 250, screen_width + 1, h);
  }
  pop();
  // pop is used to restore previous state
  // ray.show();
  // ray.lookAt(mouseX, mouseY);
  // let pt = ray.cast(wall);
  // // // console.log(pt);
  // if(pt){
  //   fill(255);
  //   ellipse(pt.x, pt.y, 8, 8);
  // }
}
