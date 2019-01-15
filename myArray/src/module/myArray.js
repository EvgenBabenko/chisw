const { bubbleSort, quickSort } = require('../utils/sortAlgorithms');
const { checkFnArgs } = require('../helpers/index');

function* iteratebleObject(object, length) {
  for (let i = 0; i < length; i++) {
    yield object[i];
  }
}

class MyArray {
  constructor(...args) {
    const hasOneArg = typeof args[0] === 'number' && args.length === 1;

    const length = hasOneArg ? args[0] : args.length

    for (let i = 0; i < length; i++) {
      this[i] = hasOneArg ? undefined : args[i];
    }

    this.length = length
  }

  static from(arrayLike, mapFn, thisArg) {
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

  *[Symbol.iterator]() {
    yield* iteratebleObject(this, this.length);
  }

  push(...args) {
    checkFnArgs({ this: this });

    for (let i = 0; i < args.length; i++) {
      this[this.length] = args[i];
      this.length += 1;
    }

    return this.length;
  }

  pop() {
    checkFnArgs({ this: this });

    if (this.length === 0) return;

    const poped = this[this.length - 1];
    delete this[this.length - 1];
    this.length -= 1;

    return poped;
  }

  forEach(cb, thisArg) {
    checkFnArgs({ this: this, cb });

    for (let i = 0; i < this.length; i++) {
      cb.call(thisArg, this[i], i, this);
    }

    return undefined;
  }

  map(cb, thisArg) {
    checkFnArgs({ this: this, cb });

    return MyArray.from({ length: this.length }, (v, k) => cb.call(thisArg, this[k], k, this));
  }

  filter(cb, thisArg) {
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

  reduce(cb, initialValue) {
    checkFnArgs({ this: this, cb })

    let accumulator = initialValue !== undefined ? cb(initialValue, this[0], 0, this) : this[0];

    for (let i = 1; i < this.length; i++) {
      accumulator = cb(accumulator, this[i], i, this);
    }

    return accumulator;
  }

  toString() {
    checkFnArgs({ this: this })

    let string = '';

    if (this.length === 0) return string;

    for (let i = 0; i < this.length; i++) {
      string += i === this.length - 1 ? this[i] : `${this[i]},`;
    }

    return string;
  }

  sort(compareFunction) {
    checkFnArgs({ this: this })

    if (compareFunction) checkFnArgs({ cb: compareFunction })

    // return quickSort(this, 0, this.length - 1, compareFunction);

    return this.length < 2 ? this : bubbleSort(this, compareFunction);
  }

  find(cb, thisArg) {
    checkFnArgs({ this: this, cb });

    for (let i = 0; i < this.length; i++) {
      if (cb.call(thisArg, this[i], i, this)) {
        return this[i];
      }
    }
  }

  slice(begin, end) {
    const instance = new MyArray();

    const start = begin < 0 ? this.length + begin : begin || 0;
    const finish = end < 0 ? this.length + end : end || this.length;

    for (let i = start; i < finish; i++) {
      instance[instance.length] = this[i];
      instance.length += 1;
    }

    return instance;
  }
}

module.exports = MyArray;
