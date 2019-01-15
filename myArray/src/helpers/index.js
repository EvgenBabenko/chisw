const fnArgsMap = {
  this: (self) => {
    if (self === null) {
      throw new TypeError('this is null or not defined');
    }
  },
  cb: (cb) => {
    if (typeof cb !== 'function') {
      throw new TypeError(`${cb} is not a function`);
    }
  },
  arrayLike: (arrayLike) => {
    if (arrayLike === null) {
      throw new TypeError('requires an array-like object - not null or undefined');
    }
  },
};

const checkFnArgs = fnArgs => Object
  .keys(fnArgs)
  .forEach((key) => {
    fnArgsMap[key](fnArgs[key]);
  });

module.exports = {
  checkFnArgs,
};
