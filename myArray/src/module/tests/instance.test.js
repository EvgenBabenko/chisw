const MyArray = require('../myArray');

describe('tests for instance', () => {
  let arr;

  beforeEach(() => {
    arr = new MyArray(1, 4, 0, 'orange', { a: 'name', b: 'user' });
  });

  test('The instance must return a specific value for a particular array index.', () => {
    expect(arr[3]).toBe('orange');
  });

<<<<<<< HEAD
  test('The instance must be an instance of the class "Array"', () => {
    expect(arr instanceof Array).toBeTruthy();
=======
  test('The instance mustn\'t be an instance of the class \'Array\'', () => {
    expect(arr instanceof Array).toBeFalsy();
>>>>>>> ee46a1607bf521349678a60f811e3bd564fa61c5
    expect(arr).toBeInstanceOf(MyArray);
  });

  test('Instance dosn\'t have any own property except length', () => {
<<<<<<< HEAD
    const arr = [];

    expect(Object.keys(arr).length).toBe(0);
    expect(Object.keys(arr)).toHaveProperty('length');
  });

  test('Prototype have only declarated method and constructor', () => {
    const declaratedMethods = ['pop', 'find', 'slice', 'push', 'filter', 'map', 'forEach', 'reduce', 'toString', 'sort', 'constructor'].sort();
    const prototypeMethods = Reflect.ownKeys(MyArray.prototype).sort();
=======
    const myArr = new MyArray();

    expect(Object.keys(myArr).length).toBe(1);
    expect(myArr).toHaveProperty('length');
  });

  test('Prototype have only declarated method and constructor', () => {
    const declaratedMethods = ['constructor', 'find', 'slice', 'push', 'pop', 'toString', 'map', 'filter', 'forEach', 'reduce', 'sort', Symbol(Symbol.iterator)];
    const prototypeMethods = Reflect.ownKeys(MyArray.prototype);
>>>>>>> ee46a1607bf521349678a60f811e3bd564fa61c5

    expect(prototypeMethods).toEqual(declaratedMethods);
  });

  test('Class has only declarated static method and common like \'length\', \'prototype\', \'from\', \'name\'', () => {
<<<<<<< HEAD
    const declaratedMethods = ['length', 'prototype', 'from', 'name'].sort();
    const staticMethods = Reflect.ownKeys(MyArray).sort();
=======
    const declaratedMethods = ['length', 'prototype', 'from', 'name'];
    const staticMethods = Reflect.ownKeys(MyArray);
>>>>>>> ee46a1607bf521349678a60f811e3bd564fa61c5

    expect(staticMethods).toEqual(declaratedMethods);
  });
});