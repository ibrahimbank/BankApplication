'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovement = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  console.log(movs);

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}
        </div>
        <div class="movements__value">${mov}€
        </div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const sum = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov);

  labelSumOut.textContent = `${Math.abs(sum)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUserNames = function (accts) {
  accts.forEach(function (acc) {
    acc.userName = acc.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserNames(accounts);

const updateUI = acc => {
  //Display movement

  displayMovement(acc.movements);

  // Display Balance
  calcDisplayBalance(acc);

  // Display Summary

  calcDisplaySummary(acc);
};

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  //prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and a welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // clear the input field

    inputLoginUsername.value = inputLoginPin.value = '';

    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const reciverAccount = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );

  console.log(amount, reciverAccount);
  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur();

  if (
    amount > 0 &&
    reciverAccount &&
    currentAccount.balance >= amount &&
    reciverAccount?.userName !== currentAccount.userName
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    reciverAccount.movements.push(+amount);
    updateUI(currentAccount);
  }
});
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // add the movement

    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );
    console.log(index);

    // delete account
    accounts.splice(index, 1);

    // hide user
    containerApp.style.opacity = 0;

    inputCloseUsername.value = inputClosePin.value = '';

    inputClosePin.blur();

    updateUI(currentAccount);
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovement(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice());

//splice: same as slice but it takes away some part of the original array(mutate)
// console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);
arr.splice(1, 2);
console.log(arr);

//Reverse
//reverse mutate(change) the original array too
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

//concat
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]); //same thing with concat

//JOIN

console.log(letters.join('-'));


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// }
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log('---------forEach--------');

// movements.forEach(function (movement) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// });
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});


//map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

//set
const currenciesUniue = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUniue);
currenciesUniue.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});


const eurToUsd = 1.1;
const movementUSD = movements.map(function (mov) {
  return mov * eurToUsd;
});

console.log(movements, movementUSD);

const movementUSDFor = [];
for (const mov of movements) {
  movementUSDFor.push(mov * eurToUsd);
}

console.log(movementUSDFor);

const movementUSDArrow = movements.map(mov => mov * eurToUsd);
console.log(movementUSDArrow);

const movementDiscriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You  ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

console.log(movementDiscriptions);

// getting only the positive value of movements
// 1.using filter
const deposits = movements.filter(mov => mov > 0);
console.log(movements);
console.log(deposits);

// 2. Using for of
const depositsFor = [];
for (let mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

//using for each
const depositForEach = [];
movements.forEach(bob => {
  if (bob > 0) depositForEach.push(bob);
});
console.log(depositForEach);

// getting only the negative
// using filter
const widthdraws = movements.filter(wid => wid < 0);
console.log(widthdraws);

// using for of
const widthdrawsFor = [];
for (const wid of movements) if (wid < 0) widthdrawsFor.push(wid);
console.log(widthdrawsFor);


console.log(movements);
const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
}, 0);
console.log(balance);

const balanceArrow = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

let balance2 = 0;
for (let mov of movements) {
  balance2 += mov;
}
console.log(balance2);

//maximum value

const max = movements.reduce(
  (acc, mov) => (acc > mov ? acc : mov),
  movements[0]
);

console.log(max);


const eurToUsd = 1.1;
const totalDepositUSSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositUSSD);


const firstwidthdrawal = movements.find(mov => mov < 0);

console.log(movements);
console.log(firstwidthdrawal);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

//class-work
for (const acc of accounts) {
  acc.owner === 'Jessica Davis' ? console.log(acc) : `invalid`;
}


console.log(movements);

// needs euality i.e checking for true or false
console.log(movements.includes(-130));

//SOME: needs a condition
console.log(movements.some(mov => mov === -130));
const anyDeposits = movements.some(mov => mov > 1500);
console.log(anyDeposits);

// EVERY

console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Seperate Callbacks

const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

// Flat, FlatMap
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

// const accountMovement = accounts.map(acc => acc.movements);
// console.log(accountMovement);

// const allMovements = accountMovement.flat();
// console.log(allMovements);

// const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance);

const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

console.log(overalBalance);

// FlatMap: only goes one level deep
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);


const owners = ['ibrahim', 'joe', 'tayo', 'remi'];
console.log(owners.sort());
console.log(owners);

// Number
console.log(movements);

// return < 0 a, b(keep order)
// return > 0 b, a(switch order)

// Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });
movements.sort((a, b) => a - b);
console.log(movements);

// descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (b > a) return 1;
// });
movements.sort((a, b) => b - a);

console.log(movements);


const arr = [1, 2, 3, 4, 5, 6, 7];
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// // empty array with fill method
// const x = new Array(7);
// console.log(x);

// x.fill(1, 3, 5);
// x.fill(1);
// console.log(x);

// arr.fill(23, 2, 6);
// console.log(arr);

// // Array.from
// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

// const z = Array.from({ length: 7 }, (_, i) => i + 1);
// const m = Array.from({ length: 100 }, (_, i) => i + 1);
// console.log(z);
// console.log(m);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );

  console.log(movementsUI);
});


// summing all the deposit that has taken place in the bank
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur);

console.log(bankDepositSum);

//getting the length of all the deposit that has taken place in the bank and are up to 1000
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);

console.log(numDeposits1000);

// summing all the deposit and widthdraws that has taken place in the bank and puttin them inside an objects
const { deposits, widtdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.widtdrawals += cur);

      sums[cur > 0 ? 'deposits' : 'widtdrawals'] += cur;
      return sums;
    },
    { deposits: 0, widtdrawals: 0 }
  );

console.log(deposits, widtdrawals);

// capitalizing the first letter of each words except some expections

const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const expections = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLocaleLowerCase()
    .split(' ')
    .map(word => (expections.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
*/
