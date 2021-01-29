class Particle {
  constructor() {
    this.pos = createVector(500, 250);
    this.rays = [];
    this.headchange = 0;
    for (let i = -30; i < 30; i++) {
      this.rays.push(new Ray(this.pos, radians(i)));
    }
  }

  rotate(angle) {
    this.headchange += angle;
    for (let i = 0; i < this.rays.length; i++) {
      this.rays[i].angleRotation(radians(i) + this.headchange);
    }
  }
  move(distance) {
    const speed = p5.Vector.fromAngle(this.headchange);
    speed.setMag(distance);
    this.pos.add(speed);
  }

  update(x, y) {
    this.pos.set(x, y);
  }

  look(walls) {
    var visuals = [];
    // for(let ray of this.rays)
    for (var i = 0; i < this.rays.length; i++) {
      let close = null;
      let record = Infinity;
      for (let wall of walls) {
        const pt = this.rays[i].cast(wall);
        if (pt) {
          const checkclose = p5.Vector.dist(this.pos, pt);
          if (checkclose < record) {
            record = checkclose;
            close = pt;
          }
        }
      }
      if (close) {

        // *****************for transparent rays******************
        stroke(255, 100);
        // *****************for transparent rays******************

        line(this.pos.x, this.pos.y, close.x, close.y);
      }
      visuals[i] = record;
    }
    return visuals;
  }

  show() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, 10);
    // square(this.pos.x, this.pos.y, 10, 10);
    for (let ray of this.rays) {
      ray.show();
    }
  }
}
