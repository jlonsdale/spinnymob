function getRandomStartPos(max) {
  return Math.ceil(Math.random() * max * (Math.round(Math.random()) ? 1 : -1));
}

class Mob {
  constructor(maxDistance) {
    this.radius = 10;
    this.viewDistance = 200;
    this.xPos = getRandomStartPos(Math.sqrt(maxDistance ** 2 / 2));
    this.yPos = getRandomStartPos(Math.sqrt(maxDistance ** 2 / 2));
    this.theta = Math.random() * Math.PI * (Math.round(Math.random()) ? 1 : -1);
  }

  viewDistanceCrossBoundary(x, y) {
    return x ** 2 + y ** 2 > this.viewDistance ** 2;
  }

  gradient(x1, y1, x2, y2) {
    return (y1 - y2) / (x1 - x2);
  }

  getCircleIntercept(gradient, intersection) {
    const a = (1 + gradient ** 2) ** 2;
    const b = 2 * gradient * intersection;
    const c = intersection ** 2 - this.viewDistance ** 2;

    const discriminant = b * b - 4 * a * c;
    const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    return [
      { x: root1, y: gradient * root1 + intersection },
      { x: root2, y: gradient * root2 + intersection },
    ];
  }

  getViewDistanceVector = () => {
    const initialCoords = {
      x: this.xPos + Math.cos(this.theta) * this.viewDistance,
      y: this.yPos + Math.sin(this.theta) * this.viewDistance,
    };
    const gradient = this.gradient(
      this.xPos,
      this.yPos,
      initialCoords.x,
      initialCoords.y
    );
    const intersection = initialCoords.y - gradient * initialCoords.x;

    if (this.viewDistanceCrossBoundary(initialCoords.x, initialCoords.y)) {
      const [point1, point2] = this.getCircleIntercept(gradient, intersection);
      return point1;
    } else {
      return initialCoords;
    }
  };
}
