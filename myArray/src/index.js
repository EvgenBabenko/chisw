const MyArray = require('./module/myArray')

const arr = new MyArray(1, 2);

const arr1 = new MyArray(2, 21, 1, 10)
const arr2 = new MyArray('слово', 'Слово', '1 Слово', '2 Слова')

// console.log(arr)

// console.log([...arr]);

// const arr = new MyArray();

// console.log('from', MyArray.from('foo'));
// console.log('from', MyArray.from({length: 3}, (v, k) => k));
// const i = MyArray.from({length: 3}, (v, k) => k)

// var m = new Map([[1, 2], [2, 4], [4, 8]]);
// console.log('from', MyArray.from(m));

// console.log([...i]);
// console.log('length', arr.length)

// console.log('toString', arr1.toString())

// console.log('push', arr.push(5, 'y'), arr)

// console.log('pop', arr.pop(), arr)

// console.log('forEach', arr.forEach((elem) => { console.log(elem) }))

// console.log('map', arr.map((elem) => elem * 2), arr)

// console.log('filter', arr.filter((elem) => elem > 5), arr)
console.log('reduce', arr.reduce((acc, elem) => acc  + elem, 0))

// console.log('reduce', arr.reduce((acc, elem) => {
//   const push = MyArray.prototype.push;

//   push.call(acc, elem)

//   return acc
// }, new MyArray))
// console.log('sort', arr2.sort())

// console.log('sort', arr.sort());

// console.log('sort', arr.sort((a, b) => a - b))

// const chaining = arr
//   .map((elem) => elem * 2)
//   // .forEach((elem) => { console.log(elem) })
//   .filter((elem) => elem > 10)
//   .map((elem) => elem * 2)
//   .reduce((acc, elem) => {
//     const push = MyArray.prototype.push;

//     push.call(acc, elem)

//     return acc
//   }, new MyArray)
//   // .push(10, -9)
//   // .pop()
//   .length

// console.log('chaining', chaining, arr)