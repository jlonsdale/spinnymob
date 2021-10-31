function getRandomStartPos(max) {
  return Math.ceil(Math.random() * max) * (Math.round(Math.random()) ? 1 : -1);
}

class Mob {
  constructor(maxDistance) {
    this.radius = 10;
    this.viewDistance = 200;
    this.xPos = getRandomStartPos(
      Math.sqrt(maxDistance ** 2 / 2) - this.radius
    );
    this.yPos = getRandomStartPos(
      Math.sqrt(maxDistance ** 2 / 2) - this.radius
    );
    this.theta = Math.random() * Math.PI * (Math.round(Math.random()) ? 1 : -1);
  }

  viewDistanceCrossBoundary(x, y) {
    return x ** 2 + y ** 2 > this.viewDistance ** 2;
  }

  gradient(x1, y1, x2, y2) {
    return (x1 - x2) / (y1 - y2);
  }

  getCircleIntercept(gradient, intercept) {
    const a = (1 + gradient) ** 2;
    const b = 2 * gradient * intercept;
    const c = intercept ** 2 - this.viewDistance ** 2;

    const discriminant = b * b - 4 * a * c;
    const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);

    return root1;
  }

  getQuadrantOfPoint(x, y) {
    if (x > 0 && y > 0) {
      return 1;
    } else if (x > 0 && y < 0) {
      return 2;
    } else if (x < 0 && y < 0) {
      return 3;
    } else return 4;
  }

  getViewDistanceVector = () => {
    const initialCoords = {
      x: this.xPos + Math.cos(this.theta) * this.viewDistance,
      y: this.yPos + Math.sin(this.theta) * this.viewDistance,
    };
    if (this.viewDistanceCrossBoundary(initialCoords.x, initialCoords.y)) {
      const gradient = (this.xPos, this.yPos, initialCoords.x, initialCoords.y);
      const intersection = this.yPos - gradient * this.xPos;
      const newx = this.getCircleIntercept(gradient, intersection);
      const newy = gradient * newx + intersection;
      console.log(newx, newy);
      return {
        x: newx,
        y: newy,
      };
    } else {
      return initialCoords;
    }
  };
}
