class Ray {
  constructor(pos, angle) {
    // const k = x+100;
    // console.log(k, y);
    this.pos = pos;
    this.dir = p5.Vector.fromAngle(angle);
  }

  angleRotation(angle) {
    this.dir = p5.Vector.fromAngle(angle);
  }

  lookAt(x, y) {
    this.dir.x = x - this.pos.x;
    this.dir.y = y - this.pos.y;
    this.dir.normalize();
  }

  show() {
    stroke(51);
    push();
    // amount to displace objects within the display window translate();
    translate(this.pos.x, this.pos.y);
    line(0, 0, this.dir.x * 10, this.dir.y * 10);
    pop();
  }

  cast(wall) {
    const x1 = wall.a.x;
    const y1 = wall.a.y;
    const x2 = wall.b.x;
    const y2 = wall.b.y;

    // *********************intersection of line dig *************************

    //                           (x1, y1)
    //                              |
    //                              |
    //   (ray) --------             | (wall)
    //  (x3, y3)   (x4, y4)         |
    //                              |
    //                             (x2, y2)

    // *********************intersection of line dig *************************

    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;

    // Reference: https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection

    const den = ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    if (den == 0) {
      return;
    }
    const numi = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4));
    const t = numi / den;
    const foru = ((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3));
    const u = -foru / den;
    if (t > 0 && t < 1 && u > 0) {
      const pt = createVector();
      pt.x = x1 + t * (x2 - x1);
      pt.y = y1 + t * (y2 - y1);
      return pt;
    } else {
      return;
    }

  }
}
