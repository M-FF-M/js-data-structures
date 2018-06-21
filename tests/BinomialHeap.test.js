
function BinomialHeapTest() {
  // sample data
  const sample = [5, 7, 3, 8, 1, 2, 6, 4, 12, 11, 99, 54, 87, -12, -5, -4, -8, 15, 16, 19, 23, 21, 104,
    101, 83, 81, 79, 77, -34, -103, -1, 62];
  
  // --> BinomialHeap
  const binHeap = new BinomialHeap();
  for (let i=0; i<sample.length; i++) {
    binHeap.insert(sample[i]);
    assertStrictEqual(binHeap.length, i + 1);
  }
  assertStrictEqual(binHeap.isEmpty(), false);

  const sample_sorted = sample.slice().sort((a, b) => a - b);

  const sample_out = [];
  for (let i=0; i<sample.length; i++) {
    sample_out[i] = binHeap.deleteMin();
    assertStrictEqual(binHeap.length, sample.length - i - 1);
  }
  assertArrayCmp(sample_sorted, sample_out, assertStrictEqual);
  assertStrictEqual(binHeap.isEmpty(), true);
}
