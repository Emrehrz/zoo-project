import { Hunter, Lion, Wolf, Sheep, Cow, Chicken, Cock } from "./animals.js"
import { createAnimals, mating, hunting, initialRandomLocation } from "./controllers.js";


function simulation() {
  const sheeps = createAnimals(Sheep, 30);
  const cows = createAnimals(Cow, 10);
  const wolves = createAnimals(Wolf, 10);
  const lions = createAnimals(Lion, 8);
  const chickens = createAnimals(Chicken, 10, false);
  const cocks = createAnimals(Cock, 10, false);

  // Tüm hayvanları birleştir
  const zooAnimals = [...sheeps, ...cows, ...wolves, ...lions, ...chickens, ...cocks];

  // Rastgele konumda bir avcı oluştur
  const hunter = new Hunter(1, initialRandomLocation().x, initialRandomLocation().y);

  //avci hayvanlar
  let predators = [hunter, ...wolves, ...lions]

  console.log(`Simulasyondan önce hayvan sayısı: ${zooAnimals.length}`);

  for (let step = 0; step < 1000; step++) {

    // Avcı ve hayvanları hareket ettir
    hunter.move();

    zooAnimals.forEach(animal => {
      animal.move();
    });

    // Avlanma
    predators.forEach(predator => {
      hunting(predator, zooAnimals);
    });

    // Çiftleşme
    const newAnimals = mating(zooAnimals, step);  // Yeni hayvanları döndüren bir mating fonksiyonu

    // Yeni doğan hayvanları adım sonunda ekle
    zooAnimals.push(...newAnimals);
  }
  console.log(`Simulasyondan sonra kalan hayvan sayısı: ${zooAnimals.length}`);

}
simulation()