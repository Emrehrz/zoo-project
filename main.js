import { Leon, Wolf, Sheep, Cow, Chicken, Cock, Hunter } from './animals.js';


// TODO: yeterli mesafede ve avlanmamis hayvan mi kontrol yap
function Hunting(hunter, hunt) {
}

function getRandomLocation() {
  const x = Math.random() * 500;
  const y = Math.random() * 500;
  return { x, y };
}

// baslangicta belirli sayida hayvanlari belirli cinsiyetlerde olustur. 
function simulation() {
  const sheeps = [];
  const cows = [];
  const wolves = [];
  const lions = [];
  const chickens = [];
  const cocks = [];
  const hunter = new Hunter(1, Math.random() * 100, Math.random() * 100);

  // Create 30 sheep (15 male, 15 female)
  for (let i = 0; i < 30; i++) {
    const gender = i < 15 ? 'male' : 'female';
    sheeps.push(new Sheep(i + 2, Math.random() * 100, Math.random() * 100, false, gender));
  }

  // Create 10 cows (5 male, 5 female)
  for (let i = 0; i < 10; i++) {
    const gender = i < 5 ? 'male' : 'female';
    cows.push(new Cow(i + 32, Math.random() * 100, Math.random() * 100, false, gender));
  }

  // Create 10 wolves (5 male, 5 female)
  for (let i = 0; i < 10; i++) {
    const gender = i < 5 ? 'male' : 'female';
    wolves.push(new Wolf(i + 42, Math.random() * 100, Math.random() * 100, false, gender));
  }

  // Create 8 lions (4 male, 4 female)
  for (let i = 0; i < 8; i++) {
    const gender = i < 4 ? 'male' : 'female';
    lions.push(new Leon(i + 52, Math.random() * 100, Math.random() * 100, false, gender));
  }

  // Create 10 chickens
  for (let i = 0; i < 10; i++) {
    chickens.push(new Chicken(i + 60, Math.random() * 100, Math.random() * 100));
  }

  // Create 10 cocks
  for (let i = 0; i < 10; i++) {
    cocks.push(new Cock(i + 70, Math.random() * 100, Math.random() * 100));
  }

  // bin birimlik  simulasyonu gerceklestir
}
