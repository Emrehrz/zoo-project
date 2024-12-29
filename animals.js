class Hunter {
  constructor(id, locationX, locationY, attackLength = 8) {
    this.id = id;
    this.locationX = locationX;
    this.locationY = locationY;
    this.huntedAnimals = [];
    this.attackLength = attackLength
    this._speed = 1
  }
  get speed() {
    return this._speed
  }

  set speed(value) {
    this._speed = value
  }
  move() {
    const [dx, dy] = this.getRandomMove();

    this.locationX = Math.max(0, Math.min(500, this.locationX + dx));
    this.locationY = Math.max(0, Math.min(500, this.locationY + dy));
  }

  getRandomMove() {
    const angle = Math.random() * 2 * Math.PI; // 0 ile 2*pi arasında bir açı

    const dx = this.speed * Math.cos(angle);
    const dy = this.speed * Math.sin(angle);

    return [dx, dy];
  }
}

class Animal {
  constructor(id, locationX, locationY, gender = null, hasGender = true, isHunted = false) {
    this.id = id;
    this.locationX = locationX;
    this.locationY = locationY;
    this.gender = hasGender ? (gender || (Math.random() < 0.5 ? 'male' : 'female')) : null;
    this.isHunted = isHunted;
    this._speed = 0
    this.lastMatingStep = -Infinity;
  }

  get speed() {
    return this._speed
  }

  set speed(value) {
    this._speed = value
  }

  move() {
    const [dx, dy] = this.getRandomMove();

    this.locationX = Math.max(0, Math.min(500, this.locationX + dx));
    this.locationY = Math.max(0, Math.min(500, this.locationY + dy));
  }

  getRandomMove() {
    const angle = Math.random() * 2 * Math.PI; // 0 ile 2*pi arasında bir açı

    const dx = this.speed * Math.cos(angle);
    const dy = this.speed * Math.sin(angle);

    return [dx, dy];
  }
}


class Lion extends Animal {

  constructor(id, locationX, locationY, gender = null, attackLength = 5) {
    super(id, locationX, locationY, gender, true)
    this.speed = 4
    this.attackLength = attackLength
  }
}

class Wolf extends Animal {
  constructor(id, locationX, locationY, gender = null, attackLength = 4) {
    super(id, locationX, locationY, gender, true);
    this.speed = 3;
    this.attackLength = attackLength
  }
}

class Sheep extends Animal {
  static speed = 2;
  constructor(id, locationX, locationY, gender = null) {
    super(id, locationX, locationY, gender, true,);

  }
}

class Cow extends Animal {
  constructor(id, locationX, locationY, gender = null) {
    super(id, locationX, locationY, gender, true);
    this.speed = 2;
  }
}

class Chicken extends Animal {
  constructor(id, locationX, locationY) {
    super(id, locationX, locationY, null, false, false);
    this.speed = 1; // Set speed via setter
  }
}


class Cock extends Animal {
  static speed = 1;

  constructor(id, locationX, locationY) {
    super(id, locationX, locationY, null, false);
  }
}


export { Lion, Wolf, Sheep, Cow, Chicken, Cock, Hunter };