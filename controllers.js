let globalAnimalID = 1;

export function getNextID() {
  return globalAnimalID++
}

export function createAnimals(animalClass, count, hasGender = true) {
  const animals = [];
  const halfCount = Math.floor(count / 2);  // Yarı sayıda erkek ve dişi olacak şekilde ayarlıyoruz

  for (let i = 0; i < count; i++) {
    const gender = hasGender ? (i < halfCount ? 'male' : 'female') : null;  // İlk yarısı erkek, geri kalanı dişi
    const animal = new animalClass(getNextID(), initialRandomLocation().x, initialRandomLocation().y, gender);
    animals.push(animal);
  }
  return animals;
}

export function initialRandomLocation() {
  let x, y

  x = Math.random() * 500
  y = Math.random() * 500

  return { x, y }
}

const matingConfigurations = {
  sheep: 'sheep',
  cow: 'cow',
  wolf: 'wolf',
  lion: 'lion',
  chicken: 'cock',  // Tavuk horozla çiftleşir
  cock: 'chicken',  // Horoz tavukla çiftleşir
};

export function canMate(animal1, animal2) {
  return (
    (animal1.constructor === animal2.constructor) ||
    (matingConfigurations[animal1.constructor.name.toLowerCase()] === animal2.constructor.name.toLowerCase())
  )
}

export function mating(zooAnimals, currentStep) {
  const newAnimals = [];
  const matedAnimals = new Set();  // Çiftleşen hayvanları takip eder

  for (let i = 0; i < zooAnimals.length; i++) {
    const animal1 = zooAnimals[i];

    if (matedAnimals.has(animal1.id)) {
      continue;
    }

    for (let j = i + 1; j < zooAnimals.length; j++) {
      const animal2 = zooAnimals[j];

      if (matedAnimals.has(animal2.id)) {
        continue;
      }

      if (canMate(animal1, animal2) &&
        animal1.gender !== animal2.gender &&
        !animal1.isHunted && !animal2.isHunted &&
        (currentStep - animal1.lastMatingStep > 5) &&
        (currentStep - animal2.lastMatingStep > 5)) {

        const distance = Math.sqrt(
          (animal1.locationX - animal2.locationX) ** 2 +
          (animal1.locationY - animal2.locationY) ** 2
        );

        if (distance <= 3) {
          // console.log("\n");
          // console.log(`${currentStep}. Adımda ${animal1.constructor.name} #${animal1.id} ve #${animal2.id} çiftleşti.`);
          // console.log(`Animal 1: ${animal1.lastMatingStep} - Animal 2: ${animal2.lastMatingStep}`);

          const gender = Math.random() > 0.5 ? 'male' : 'female';
          const newAnimal = new animal1.constructor(
            getNextID() + newAnimals.length + 1,
            initialRandomLocation().x,
            initialRandomLocation().y,
            gender
          );

          newAnimals.push(newAnimal);
          console.log(`Yeni doğan hayvan: ${newAnimal.constructor.name} #${newAnimal.id}`);

          animal1.lastMatingStep = currentStep;
          animal2.lastMatingStep = currentStep;

          matedAnimals.add(animal1.id);
          matedAnimals.add(animal2.id);

          break;
        }
      }
    }
  }

  return newAnimals;
}

const huntingConfigurations = {
  hunter: { preyList: ['sheep', 'cow', 'wolf', 'lion', 'chicken', 'cock'] },
  wolf: { preyList: ['sheep', 'chicken', 'cock'] },
  lion: { preyList: ['cow', 'sheep'] },
}

export function hunting(hunter, allAnimals) {
  const hunterType = hunter.constructor.name.toLowerCase();
  const config = huntingConfigurations[hunterType];

  if (!config) return;

  const { locationX: hx, locationY: hy, attackLength } = hunter;
  const preyTypes = config.preyList;

  preyTypes.forEach(preyType => {
    const preyArray = allAnimals.filter(animal => animal.constructor.name.toLowerCase() === preyType);

    preyArray.forEach((prey) => {
      if (prey.isHunted) return;

      const { locationX: px, locationY: py } = prey;
      const distance = Math.sqrt((hx - px) ** 2 + (hy - py) ** 2);

      if (distance <= attackLength) {
        console.log(`${hunterType} avladı: ${preyType} ${prey.id}`);
        prey.isHunted = true;
        allAnimals.splice(allAnimals.indexOf(prey), 1);  // Avlanan hayvanı diziden çıkar
      }
    });
  });
}
