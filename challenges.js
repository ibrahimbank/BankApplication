'use strict';
/*
function checkDogs(dogsJulia, dogsKate) {
  //   dogsJulia = [9, 16, 6, 8, 3];
  //   //   dogsJulia = [3, 5, 2, 12, 7];
  //   dogsKate = [10, 5, 6, 1, 4];
  // //   dogsKate = [4, 1, 15, 8, 3];

  let dogsJuliaCorrected = dogsJulia.slice(1, 3);

  console.log(dogsJuliaCorrected);
  // console.log(dogsJulia);

  const dogsJuliaKate = dogsJuliaCorrected.concat(dogsKate);

  console.log(dogsJuliaKate);

  for (const [i, dogs] of dogsJuliaKate.entries()) {
    if (dogs >= 3) {
      console.log(`Dog number ${i + 1} is an adult and is ${dogs} years old`);
    } else console.log(`Dog number ${i + 1} is still a puppy🐶`);
  }
  console.log('---------forEach--------');
  // ----using forEach------
  dogsJuliaKate.forEach(function (dogs, i) {
    if (dogs >= 3) {
      console.log(`Dog number ${i + 1} is an adult and is ${dogs} years old`);
    } else console.log(`Dog number ${i + 1} is still a puppy🐶`);

    ``;
  });
}

checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);


const calcAverageHumanAge = ages => {
  const humanAge = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  console.log(humanAge);

  const adult = humanAge.filter(age => age >= 18);
  console.log(adult);

  const average = adult.reduce((acc, age) => acc + age, 0) / adult.length;

  //using another method, dividing each each then adding it to the acc, jus like if we want to divide somthing like addition of 2 and 3 with 2, so it will be 2/2 + 3/2 will  give us 2.5 just like (2+3)/2
  // const average = adult.reduce((acc, age, i, arr) => acc + age / arr.length, 0);

  return average;
};
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1, avg2);

const calcAverageHumanAge = ages => {
  const humanAge = ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

  return humanAge;
};
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1, avg2);


const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1
dogs.forEach(dog => {
  const recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
  dog['recommendedFood'] = recommendedFood;
  return recommendedFood;
});

console.log(dogs);

// 2
const searchSarah = dogs.find(dog => {
  if (dog.owners.includes('Sarah') && dog.curFood > dog.recommendedFood) {
    console.log('too much');
  } else if (
    dog.owners.includes('Sarah') &&
    dog.curFood < dog.recommendedFood
  ) {
    console.log('too little');
  }
});

// 3.I
const ownersEatTooMuch = dogs
  .filter(dog => {
    return dog.curFood > dog.recommendedFood;
  })
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

// 4i
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);

// 3.II
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

// 4ii
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// "Matilda andAlice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eattoo little!"

// 5
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// 6
console.log(
  dogs.some(
    dog =>
      dog.curFood > dog.recommendedFood * 0.9 &&
      dog.curFood < dog.recommendedFood * 1.1
  )
);

// 7
const okay = dogs.filter(
  dog =>
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1
);

console.log(okay);

// 8

const dogs2 = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);

console.log(dogs2);
*/
