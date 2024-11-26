module.exports = class Dice {
  constructor(sides) {
    this.sides = sides;
  }
  roll(index) {
    return this.sides[index % this.sides.length];
  }
};
