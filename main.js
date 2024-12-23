import { Hunter, Lion, Wolf, Sheep, Cow, Chicken, Cock } from "./animals.js"


function initialRandomLocation() {
  let x, y

  x = Math.random() * 500
  y = Math.random() * 500

  return { x, y }
}

function createAnimals(animalClass, count, hasGender = true) {
  const animals = [];
  const halfCount = Math.floor(count / 2);  // Yarı sayıda erkek ve dişi olacak şekilde ayarlıyoruz

  for (let i = 0; i < count; i++) {
    const gender = hasGender ? (i < halfCount ? 'male' : 'female') : null;  // İlk yarısı erkek, geri kalanı dişi
    const animal = new animalClass(i + 1, initialRandomLocation().x, initialRandomLocation().y, gender);
    animals.push(animal);
  }
  return animals;
}
// baslangicta belirli sayida hayvanlari esit sayida cinsiyetlerde olustur. 

function coupling(currentAnimal, animalArray) {
  //hayvan avlanmis mi kontrol et

  // hayvanin yakinlarindaki karsi cinsle arasindaki mesefayi kontrol et

  // uygunsa ciftles ve hayvanin dizisine yeni hayvan ekle

}

const matingConfigurations = {
  sheep: 'sheep',
  cow: 'cow',
  wolf: 'wolf',
  lion: 'lion',
  chicken: 'cock',  // Tavuk horozla çiftleşir
  cock: 'chicken',  // Horoz tavukla çiftleşir
};


function mating(zooAnimals) {
  const matingDistance = 3

  zooAnimals.forEach((animal, index) => {
    const { gender, locationX: ax, locationY: ay } = animal;

    // Eğer hayvanın cinsiyeti yoksa (tavuk ve horoz için)
    const hasGender = gender !== null;

    const mateType = matingConfigurations[animal.constructor.name.toLowerCase()];

    if (!mateType) return;

    // Eşleşecek hayvanları bul
    const potentialMates = zooAnimals.filter(other =>
      other.constructor.name.toLowerCase() === mateType &&
      (hasGender ? other.gender !== gender : true) &&  // Eğer cinsiyeti varsa karşı cins olmalı
      !other.isHunted // Avlanmamış olmalı
    );

    potentialMates.forEach(mate => {
      const { locationX: mx, locationY: my } = mate;

      const distance = Math.sqrt((ax - mx) ** 2 + (ay - my) ** 2);

      if (distance <= matingDistance) {  // 3 birim çiftleşme mesafesi
        console.log(`${animal.constructor.name} çiftleşti`);

        // Yeni hayvan yarat
        const newAnimal = createAnimals(animal.constructor, 1, !hasGender)[0];  // Eğer cinsiyet varsa, cinsiyetli, yoksa cinsiyetsiz yarat
        newAnimal.locationX = (ax + mx) / 2;  // Ortalamasını al
        newAnimal.locationY = (ay + my) / 2;

        zooAnimals.push(newAnimal);
        // console.log(`Yeni ${animal.constructor.name} doğdu!`);
      }
    });
  });
}

const huntingConfigurations = {
  hunter: { preyList: ['sheep', 'cow', 'wolf', 'lion', 'chicken', 'cock'] },
  wolf: { preyList: ['sheep', 'chicken', 'cock'] },
  lion: { preyList: ['cow', 'sheep'] },
}


function hunting(hunter, allAnimals) {
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

function simulation() {
  const sheeps = createAnimals(Sheep, 30);  // 30 koyun
  const cows = createAnimals(Cow, 10);     // 10 inek
  const wolves = createAnimals(Wolf, 10);  // 10 kurt
  const lions = createAnimals(Lion, 8);    // 8 aslan
  const chickens = createAnimals(Chicken, 10, false);  // 10 tavuk (cinsiyet yok)
  const cocks = createAnimals(Cock, 10, false);        // 10 horoz (cinsiyet yok)

  const hunter = new Hunter(1, initialRandomLocation().x, initialRandomLocation().y);


  // cows.forEach((cow) => cow.move())

  // wolves.forEach((wolf) => wolf.move())

  // lions.forEach((lion) => lion.move())

  // chickens.forEach((chicken) => chicken.move())

  // cocks.forEach((cock) => cock.move())

  const sheeps1 = [
    new Sheep(2, 102, 103),
    new Sheep(3, 150, 150, null, true), // Bu hayvan zaten avlanmış
  ];

  let theLion = new Lion(3, 100, 100)

  hunting(theLion)

  for (let step = 0; step < 10; step++) {

    // butun hayvanlari ve avciyi hareket ettir
    hunter.move()

    sheeps.forEach((sheep) => sheep.move())

    // hunting(hunter, huntingConfigurations.hunter)
    /*
      Her adim sonunda:
        avlama durumlarini kontrol et

        daha sonra ciftesme durumlarini kontrol et

      en sonunda avlanmis hayvanlari diziden cikart
    */
  }
}

function simulationTest() {
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

  console.log(`Avlanmadan önce hayvan sayısı: ${zooAnimals.length}`);

  //avci hayvanlar
  let predators = [hunter, ...wolves, ...lions]

  // Tüm avcı hayvanları sırayla avlanmaya gönder
  predators.forEach(predator => {
    hunting(predator, zooAnimals);
  });

  // Çiftleşme
  mating(zooAnimals);


  console.log(`Avlandıktan sonra kalan hayvan sayısı: ${zooAnimals.length}`);


}
simulationTest()



