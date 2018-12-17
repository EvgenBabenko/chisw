const MyArray = require('./myArray');

const hasMethod = (method) => () => {
  const arr = new MyArray();
  expect(arr[method]).toBeInstanceOf(Function);
}

const doesntHasOwnMethod = (methodName) => () => {
  const arr = new MyArray();
  expect(arr.hasOwnProperty(methodName)).toBeFalsy();
}

describe('test custom class Array', () => {

  describe('test constructor Array', () => {
    test('length should be equals 2', () => {
      const arr = new MyArray(1, 2);
      expect(arr.length).toEqual(2);
    });

    test('has property length', () => {
      const arr = new MyArray();
      expect(arr.hasOwnProperty("length")).toBeTruthy();
    });
  });

  describe('test chaining', () => {
    test('should return length 2', () => {
      const arr = new MyArray(2, 21, 1, 10);

      const chaining = arr
        .map((elem) => elem * 2)
        .filter((elem) => elem > 10)
        .map((elem) => elem * 2)
        .reduce((acc, elem) => {
          const push = MyArray.prototype.push;

          push.call(acc, elem)

          return acc
        }, new MyArray)
        .length

      expect(chaining).toBe(2);
    });
  });

  describe('test method Symbol.Iterator of class Array', () => {
    test('with spread operator should return orinal array', () => {
      const arr = new MyArray(1, 2);
      expect([...arr]).toEqual([1, 2]);
    });
  });

  describe('test method push of class Array', () => {
    test('has method push', hasMethod('push'));

    test('doesn\'t has own method map', doesntHasOwnMethod('push'));

    test('should return length of Array', () => {
      const arr = new MyArray(1, 2);
      expect(arr.push(4)).toBe(3);
    });

    test('call with 0 arguments and empty Array should return 0', () => {
      const arr = new MyArray();
      expect(arr.push()).toBe(0);
    });
  });

  describe('test method pop of class Array', () => {
    test('has method pop', hasMethod('pop'));

    test('doesn\'t has own method pop', doesntHasOwnMethod('pop'));

    test('should return removed element of Array', () => {
      const arr = new MyArray(1, 2);
      expect(arr.pop()).toBe(2);
    });

    test('should return undefined with call on empty array', () => {
      const arr = new MyArray();
      expect(arr.pop()).toBe(undefined);
    });

    test('after remove method array length should be 1 less then before', () => {
      const arr = new MyArray(1, 2);
      arr.pop();
      expect(arr.length).toBe(1);
    });
  });

  describe('test method forEach of class Array', () => {
    test('has method forEach', hasMethod('forEach'));

    test('doesn\'t has own method forEach', doesntHasOwnMethod('forEach'));

    test('should return undefined', () => {
      const arr = new MyArray(1, 2);
      const mockCallback = jest.fn(x => 42 + x);
      expect(arr.forEach(mockCallback)).toBe(undefined);
    });

    test('call times should be 2', () => {
      const arr = new MyArray(1, 2);
      const mockCallback = jest.fn(x => x);
      arr.forEach(mockCallback);
      expect(mockCallback.mock.calls.length).toBe(2);
    });

    test('call times should not be 2', () => {
      const arr = new MyArray(1, 2, 3);
      const mockCallback = jest.fn(x => 42 + x);
      arr.forEach(mockCallback);
      expect(mockCallback.mock.calls.length).not.toBe(2);
    });

    test('should return TypeError when cb isn\'t function', () => {
      const arr = new MyArray(1, 2, 3);
      expect(() => { arr.forEach(null) }).toThrowError(TypeError);
    });
  });

  describe('test method map of class Array', () => {
    test('has method map', hasMethod('map'));

    test('doesn\'t has own method map', doesntHasOwnMethod('map'));

    test('should return TypeError when cb isn\'t function', () => {
      const arr = new MyArray(1, 2, 3);
      expect(() => { arr.map(null) }).toThrowError(TypeError);
    });
  });

  describe('test method filter of class Array', () => {
    test('has method filter', hasMethod('filter'));

    test('doesn\'t has own method filter', doesntHasOwnMethod('filter'));

    test('should return TypeError when cb isn\'t function', () => {
      const arr = new MyArray(1, 2, 3);
      expect(() => { arr.filter(null) }).toThrowError(TypeError);
    });
  });

  describe('test method reduce of class Array', () => {
    test('has method reduce', hasMethod('reduce'));

    test('doesn\'t has own method reduce', doesntHasOwnMethod('reduce'));

    test('should return TypeError when cb isn\'t function', () => {
      const arr = new MyArray(1, 2, 3);
      expect(() => { arr.reduce(null) }).toThrowError(TypeError);
    });
  });

  describe('test method toString of class Array', () => {
    test('has method toString', hasMethod('toString'));

    test('doesn\'t has own method toString', doesntHasOwnMethod('toString'));
  });

  describe('test method sort of class Array', () => {
    test('has method sort', hasMethod('sort'));

    test('doesn\'t has own method sort', doesntHasOwnMethod('sort'));

    test('should return TypeError when compareFunction isn\'t function', () => {
      const arr = new MyArray(1, 2, 3);
      expect(() => { arr.sort(1) }).toThrowError(TypeError);
    });
  });

  describe('test static method from of class Array', () => {
    test('should return TypeError when arrayLike isn\'t an array-like object', () => {
      const arr = new MyArray(1, 2, 3);
      expect(() => { arr.from(null) }).toThrowError(TypeError);
    });

    test('should return TypeError when mapFn isn\'t function', () => {
      const arr = new MyArray(1, 2, 3);
      expect(() => { arr.from({ length: 3 }, null) }).toThrowError(TypeError);
    });
  });

  // test('call with three arg', () => {
  //     const arr = [1,2.3,5];
  //     const cb =  jest.fn();
  //     arr.map(cb);
  //     expect(cb.length).toBeGreaterThan(0);
  //     // expect(cb).toHaveBeenLastCalledWith(4,3,arr);
  // });
});