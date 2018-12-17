const { bubbleSort, quickSort } = require('../utils/sortAlgorithms');
const { checkFnArgs } = require('../helpers/index');

function* iteratebleObject(object, length) {
  for (let i = 0; i < length; i++) {
    yield object[i];
  }
}

function MyArray() {
  for (let i = 0; i < arguments.length; i++) {
    this[i] = arguments[i];
  }

  this.length = arguments.length;
}

MyArray.prototype[Symbol.iterator] = function* () { yield* iteratebleObject(this, this.length) }

MyArray.prototype.push = function () {
  checkFnArgs({ this: this });

  for (let i = 0; i < arguments.length; i++) {
    this[this.length] = arguments[i];
    this.length += 1;
  }

  return this.length;
}

MyArray.prototype.pop = function () {
  checkFnArgs({ this: this });

  if (this.length === 0) return;

  const poped = this[this.length - 1];
  delete this[this.length - 1];
  this.length -= 1;

  return poped;
}

MyArray.prototype.forEach = function (cb) {
  checkFnArgs({ this: this, cb });

  for (let i = 0; i < this.length; i++) {
    cb(this[i], i, this);
  }

  return undefined;
}

MyArray.prototype.map = function (cb, thisArg) {
  checkFnArgs({ this: this, cb });

  return MyArray.from({length: this.length}, (v, k) => cb.call(thisArg, this[k], k, this));
}

MyArray.prototype.filter = function (cb, thisArg) {
  checkFnArgs({ this: this, cb })

  const instance = new MyArray();

  for (let i = 0; i < this.length; i++) {
    if (cb.call(thisArg, this[i], i, this)) {
      instance[instance.length] = this[i];
      instance.length += 1;
    }
  }

  return instance;
}

MyArray.prototype.reduce = function (cb, initialValue) {
  checkFnArgs({ this: this, cb })

  for (let i = 0; i < this.length; i++) {
    initialValue = initialValue ? cb(initialValue, this[i], i, this) : this[i];
  }

  return initialValue;
}

MyArray.prototype.toString = function () {
  checkFnArgs({ this: this })

  let string = '';

  for (let i = 0; i < this.length; i++) {
    string += i === this.length - 1 ? this[i] : `${this[i]},`;
  }

  return string;
}

MyArray.prototype.sort = function (compareFunction) {
  checkFnArgs({ this: this })

  if (compareFunction) checkFnArgs({ cb: compareFunction })

  // return quickSort(this, 0, this.length - 1, compareFunction);

  return this.length < 2 ? this : bubbleSort(this, compareFunction);
}

MyArray.from = function (arrayLike, mapFn, thisArg) {
  checkFnArgs({ this: this, arrayLike })

  if (mapFn) checkFnArgs({ cb: mapFn })

  const instance = new MyArray()

  instance.length = arrayLike.size ? arrayLike.size : arrayLike.length;

  const items = arrayLike.size || typeof arrayLike === 'string'
    ? arrayLike
    : iteratebleObject(arrayLike, instance.length)

  let i = 0;

  for (let item of items) {
    instance[i] = mapFn ? mapFn.call(thisArg, item, i) : item, i += 1
  }

  return instance;
}

module.exports = MyArray