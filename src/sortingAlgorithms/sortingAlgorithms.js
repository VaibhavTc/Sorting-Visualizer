export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(mainArray, startIdx, endIdx, animations) {
  if (startIdx < endIdx) {
    const pivotIdx = partition(mainArray, startIdx, endIdx, animations);
    quickSortHelper(mainArray, startIdx, pivotIdx - 1, animations);
    quickSortHelper(mainArray, pivotIdx + 1, endIdx, animations);
  }
}

function partition(mainArray, startIdx, endIdx, animations) {
  const pivotValue = mainArray[endIdx];
  let pivotIdx = startIdx;
  for (let i = startIdx; i < endIdx; i++) {
    animations.push([i, endIdx]);
    animations.push([i, endIdx]);
    if (mainArray[i] < pivotValue) {
      animations.push([i, mainArray[pivotIdx]]);
      animations.push([pivotIdx, mainArray[i]]);
      [mainArray[i], mainArray[pivotIdx]] = [mainArray[pivotIdx], mainArray[i]];
      pivotIdx++;
    } else {
      animations.push([i, mainArray[i]]);
      animations.push([i, mainArray[i]]);
    }
  }
  animations.push([pivotIdx, endIdx]);
  animations.push([pivotIdx, endIdx]);
  animations.push([pivotIdx, mainArray[endIdx]]);
  animations.push([endIdx, mainArray[pivotIdx]]);
  [mainArray[pivotIdx], mainArray[endIdx]] = [
    mainArray[endIdx],
    mainArray[pivotIdx],
  ];
  return pivotIdx;
}

export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bubbleSortHelper(array, animations);
  return animations;
}

function bubbleSortHelper(mainArray, animations) {
  const n = mainArray.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push([j, j + 1]);
      animations.push([j, j + 1]);
      if (mainArray[j] > mainArray[j + 1]) {
        animations.push([j, mainArray[j + 1]]);
        animations.push([j + 1, mainArray[j]]);
        [mainArray[j], mainArray[j + 1]] = [mainArray[j + 1], mainArray[j]];
      } else {
        animations.push([j, mainArray[j]]);
        animations.push([j, mainArray[j]]);
      }
    }
  }
}

export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  heapSortHelper(array, animations);
  return animations;
}

function heapSortHelper(mainArray, animations) {
  const n = mainArray.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(mainArray, n, i, animations);
  }

  for (let i = n - 1; i > 0; i--) {
    animations.push([0, i]);
    animations.push([0, i]);
    animations.push([0, mainArray[i]]);
    animations.push([i, mainArray[0]]);
    [mainArray[0], mainArray[i]] = [mainArray[i], mainArray[0]];

    heapify(mainArray, i, 0, animations);
  }
}

function heapify(mainArray, n, i, animations) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && mainArray[left] > mainArray[largest]) {
    largest = left;
  }

  if (right < n && mainArray[right] > mainArray[largest]) {
    largest = right;
  }

  if (largest !== i) {
    animations.push([i, largest]);
    animations.push([i, largest]);
    animations.push([i, mainArray[largest]]);
    animations.push([largest, mainArray[i]]);
    [mainArray[i], mainArray[largest]] = [mainArray[largest], mainArray[i]];

    heapify(mainArray, n, largest, animations);
  }
}
