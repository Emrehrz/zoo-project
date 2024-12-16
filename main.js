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
// baslangicta belirli sayida hayvanlari belirli cinsiyetlerde olustur. 
function simulation() {
  const sheeps = createAnimals(Sheep, 30);  // 30 koyun
  const cows = createAnimals(Cow, 10);     // 10 inek
  const wolves = createAnimals(Wolf, 10);  // 10 kurt
  const lions = createAnimals(Lion, 8);    // 8 aslan
  const chickens = createAnimals(Chicken, 10, false);  // 10 tavuk (cinsiyet yok)
  const cocks = createAnimals(Cock, 10, false);        // 10 horoz (cinsiyet yok)

  const hunter = new Hunter(1, initialRandomLocation().x, initialRandomLocation().y);

  // 30 sheeps

  // 10 cows

  // 10 chickens

  // 10 wolfs

  // 10 cocks

  // 8 lions

  console.log(lions);



  // for (let step = 0; step < 1000; step++) {
  //   hunter.move()

  // }

}


simulation()


