const bubbleSort = (items, cb) => {
  let swapped;

  do {
    swapped = false;

    for (let i = 0; i < items.length - 1; i++) {
      const curentElem = (typeof items[i] === 'string') ? items[i] : `${items[i]}`
      const nextElem = (typeof items[i + 1] === 'string') ? items[i + 1] : `${items[i + 1]}`

      if (cb ? (cb(curentElem, nextElem) > 0) : (curentElem > nextElem)) {
        swap(items, i, i + 1);
        swapped = true;
      }
    }

  } while (swapped);

  return items;
}

const quickSort = (items, left, right, cb) => {
  let index;

  if (items.length > 1) {
    left = typeof left != "number" ? 0 : left;
    right = typeof right != "number" ? items.length - 1 : right;

    index = partition(items, left, right);

    if (left < index - 1) quickSort(items, left, index - 1);

    if (index < right) quickSort(items, index, right);
  }

  return items;
}

const partition = (items, left, right) => {
  const pivot = items[Math.floor((right + left) / 2)];

  while (left <= right) {
    while (items[left] < pivot) { left++ };

    while (items[right] > pivot) { right-- };

    if (left <= right) {
      swap(items, left, right);
      left++;
      right--;
    }
  }

  return left;
}

const swap = (items, firstIndex, secondIndex) => {
  const temp = items[firstIndex];

  items[firstIndex] = items[secondIndex];
  items[secondIndex] = temp;
}

module.exports = {
  bubbleSort,
  quickSort,
}