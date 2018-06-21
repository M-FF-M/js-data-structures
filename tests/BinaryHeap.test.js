
function BinaryHeapTest() {
  // sample data
  const sample = [5, 7, 3, 8, 1, 2, 6, 4, 12, 11, 99, 54, 87, -12, -5, -4, -8, 15, 16, 19, 23, 21, 104,
    101, 83, 81, 79, 77, -34, -103, -1, 62];
  
  // --> BinaryHeap
  const binHeap = new BinaryHeap();
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

  const binHeap2 = new PriorityQueue((a, b) => a - b, sample);
  assertStrictEqual(binHeap2.length, sample.length);

  const sample_out_2 = [];
  for (let i=0; i<sample.length; i++) {
    sample_out_2[i] = binHeap2.deleteMin();
    assertStrictEqual(binHeap2.length, sample.length - i - 1);
  }
  
  assertArrayCmp(sample_sorted, sample_out_2, assertStrictEqual);
  assertStrictEqual(binHeap2.isEmpty(), true);

  const binHeap3 = new CustomBinaryHeap((a, b) => b - a);
  for (let i=0; i<sample.length; i++) {
    binHeap3.insert(sample[i]);
    assertStrictEqual(binHeap3.length, i + 1);
  }
  assertStrictEqual(binHeap3.isEmpty(), false);

  const sample_sorted2 = sample.slice().sort((a, b) => b - a);

  const sample_out_3 = [];
  for (let i=0; i<sample.length; i++) {
    sample_out_3[i] = binHeap3.deleteMin();
    assertStrictEqual(binHeap3.length, sample.length - i - 1);
  }
  
  assertArrayCmp(sample_sorted2, sample_out_3, assertStrictEqual);
  assertStrictEqual(binHeap3.isEmpty(), true);

  const binHeap4 = new PriorityQueue((a, b) => b - a, sample);
  assertStrictEqual(binHeap4.length, sample.length);

  const sample_out_4 = [];
  for (let i=0; i<sample.length; i++) {
    sample_out_4[i] = binHeap4.deleteMin();
    assertStrictEqual(binHeap4.length, sample.length - i - 1);
  }
  
  assertArrayCmp(sample_sorted2, sample_out_4, assertStrictEqual);
  assertStrictEqual(binHeap4.isEmpty(), true);
}
