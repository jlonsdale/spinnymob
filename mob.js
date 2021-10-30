function getRandomStartPos(max) {
  return Math.ceil(Math.random() * max) * (Math.round(Math.random()) ? 1 : -1);
}

class Mob {
  constructor(maxDistance) {
    this.radius = 10;
    this.viewDistance = 50;
    this.xPos = getRandomStartPos(
      Math.sqrt(maxDistance ** 2 / 2) - this.radius
    );
    this.yPos = getRandomStartPos(
      Math.sqrt(maxDistance ** 2 / 2) - this.radius
    );
  }
}
