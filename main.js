import { Hunter, Lion, Wolf, Sheep, Cow, Chicken, Cock } from "./animals.js"
import { createAnimals, mating, hunting, initialRandomLocation } from "./controllers.js"


function simulation() {

  // rastgele konumlarda avci ve hayvanlari olustur
  const hunter = new Hunter(1, initialRandomLocation().x, initialRandomLocation().y)

  const sheeps = createAnimals(Sheep, 30)
  const cows = createAnimals(Cow, 10)
  const wolves = createAnimals(Wolf, 10)
  const lions = createAnimals(Lion, 8)
  const chickens = createAnimals(Chicken, 10, false)
  const cocks = createAnimals(Cock, 10, false)

  let zooAnimals = [...sheeps, ...cows, ...wolves, ...lions, ...chickens, ...cocks]

  //avlanma olayini gerceklestirmek uzere avci hayvanlar
  let predators = [hunter, ...wolves, ...lions]

  console.log(`Simulasyondan önce hayvan sayısı: ${zooAnimals.length}`)

  for (let step = 0; step < 1000; step++) {

    hunter.move()
    zooAnimals.forEach(animal => {
      animal.move()
    })

    predators.forEach(predator => {
      hunting(predator, zooAnimals)
    })

    // yeni dogan hayvanlar
    const newAnimals = mating(zooAnimals, step)
    zooAnimals.push(...newAnimals)

    // yeni doganlar arasinda avci olan hayvanlar
    newAnimals.forEach(animal => {
      if (animal instanceof Wolf || animal instanceof Lion) {
        predators.push(animal)
      }
    })
  }

  // hayvan turlerine gore gruplandirma
  const animalCounts = zooAnimals.reduce((acc, animal) => {
    const type = animal.constructor.name
    acc[type] = (acc[type] || 0) + 1
    return acc
  }, {})


  console.log(`Simulasyondan sonra toplam hayvan sayısı: ${zooAnimals.length}`)
  Object.entries(animalCounts).forEach(([type, count]) => {
    console.log(`${type}: ${count}`)
  })
}

simulation()