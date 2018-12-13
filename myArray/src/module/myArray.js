const { bubbleSort, quickSort } = require('../utils/sortAlgorithms');
const { checkFnArgs } = require('../helpers/index');

function MyArray() {
  for (let i = 0; i < arguments.length; i++) {
    this[i] = arguments[i];
  }

  this.length = arguments.length;
}

MyArray.prototype[Symbol.iterator] = function () {
  let index = 0;
  const self = this;

  return {
    next() {
      let value = self[index];
      let done = index === self.length;
      index += 1;

      return {
        value,
        done,
      }
    }
  }
}

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

  const instance = new MyArray();
  instance.length = this.length;

  for (let i = 0; i < this.length; i++) {
    instance[i] = cb.call(thisArg, this[i], i, this);
  }

  return instance;
}

MyArray.prototype.filter = function (cb, thisArg) {
  checkFnArgs({ this: this, cb })

  const instance = new MyArray();

  let index = 0;

  for (let i = 0; i < this.length; i++) {
    if (cb.call(thisArg, this[i], i, this)) {
      instance[index] = this[i];
      instance.length += 1;
      index += 1;
    }
  }

  return instance;
}

MyArray.prototype.reduce = function (cb, initialValue) {
  checkFnArgs({ this: this, cb })

  for (let i = 0; i < this.length; i++) {
    debugger
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

  const length = arrayLike.size ? arrayLike.size : arrayLike.length;

  let i = 0;

  if (arrayLike.size) {
    for (let item of arrayLike) {
      instance[i] = mapFn ? mapFn.call(thisArg, item, i) : item;
      i += 1
    };
  } else {
    while (i < length) {
      const item = arrayLike[i];

      instance[i] = mapFn ? mapFn.call(thisArg, item, i) : item
      i += 1
    }
  }

  instance.length = length

  return instance;
}

module.exports = MyArray