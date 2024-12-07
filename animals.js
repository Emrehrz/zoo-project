class Hunter {
  constructor(id, locationX, locationY) {
    this.id = id;
    this.locationX = locationX;
    this.locationY = locationY;
    this.huntedAnimals = [];
  }

  move(maxX, maxY) {
    const dx = getRandomStep(this.constructor.speed);
    const dy = getRandomStep(this.constructor.speed);

    // Keep new coordinates within bounds
    this.locationX = Math.max(0, Math.min(maxX, this.locationX + dx));
    this.locationY = Math.max(0, Math.min(maxY, this.locationY + dy));
  }

}

class Animal {
  constructor(id, locationX, locationY, gender = null) {
    this.id = id;
    this.locationX = locationX;
    this.locationY = locationY;
    this.gender = gender || (Math.random() < 0.5 ? 'male' : 'female');
  }

  move(maxX, maxY) {
    const dx = getRandomStep(this.constructor.speed);
    const dy = getRandomStep(this.constructor.speed);

    // Keep new coordinates within bounds
    this.locationX = Math.max(0, Math.min(maxX, this.locationX + dx));
    this.locationY = Math.max(0, Math.min(maxY, this.locationY + dy));
  }
}

class Leon extends Animal {
  static speed = 4;
  constructor(id, locationX, locationY, ishunted = false, gender = null) {
    super(id, locationX, locationY, gender);
    this.ishunted = ishunted;
  }
}

class Wolf extends Animal {
  static speed = 3;
  constructor(id, locationX, locationY, ishunted = false, gender = null) {
    super(id, locationX, locationY, gender);
    this.ishunted = ishunted;
  }
}

class Sheep extends Animal {
  static speed = 2;
  constructor(id, locationX, locationY, ishunted = false, gender = null) {
    super(id, locationX, locationY, gender);
    this.ishunted = ishunted;
  }
}

class Cow extends Animal {
  static speed = 2;
  constructor(id, locationX, locationY, ishunted = false, gender = null) {
    super(id, locationX, locationY, gender);
    this.ishunted = ishunted;
  }
}

class Chicken extends Animal {
  static speed = 1;
  constructor(id, locationX, locationY) {
    super(id, locationX, locationY, null);
  }
}

class Cock extends Animal {
  static speed = 1;
  constructor(id, locationX, locationY) {
    super(id, locationX, locationY, null);
  }
}

export { Leon, Wolf, Sheep, Cow, Chicken, Cock, Hunter };