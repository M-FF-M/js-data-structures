
function HashSetTest() {
  // sample data
  const sample = [15, 5, 22, 7, 3, 18, 8, 16, 1, 2, 6, 21, 19, 20, 17, 4, 9, 11, 14, 10, 0, 13, 12];

  // --> HashSet
  const set = new HashSet();
  assertStrictEqual(set.isEmpty(), true);
  for (let i=0; i<sample.length; i++) {
    set.insert(sample[i]);
    assertStrictEqual(set.contains(sample[i]), true);
    assertStrictEqual(set.length, i + 1);
  }
  set.insert(1);
  set.insert(2);
  set.insert(3);
  set.insert(4);
  assertStrictEqual(set.length, sample.length);
  assertStrictEqual(set.contains(-1), false);
  assertStrictEqual(set.contains(-2), false);
  assertStrictEqual(set.contains(23), false);
  assertStrictEqual(set.contains(24), false);

  const setArray = set.toArray();
  assertStrictEqual(setArray.length, sample.length);
  for (let i=0; i<setArray.length; i++) {
    assertStrictEqual(sample.includes(setArray[i]), true);
    assertStrictEqual(setArray.includes(sample[i]), true);
  }

  set.remove(6);
  set.remove(6);
  assertStrictEqual(set.length, sample.length - 1);
  assertStrictEqual(set.contains(6), false);
  set.remove(12);
  set.remove(21);
  set.remove(3);
  set.remove(4);
  set.remove(1);
  set.remove(2);
  set.remove(0);
  assertStrictEqual(set.length, sample.length - 8);
  assertStrictEqual(set.contains(12), false);
  assertStrictEqual(set.contains(21), false);
  assertStrictEqual(set.contains(3), false);
  assertStrictEqual(set.contains(4), false);
  assertStrictEqual(set.contains(1), false);
  assertStrictEqual(set.contains(2), false);
  assertStrictEqual(set.contains(0), false);
  assertStrictEqual(set.contains(5), true);
  assertStrictEqual(set.contains(7), true);
  assertStrictEqual(set.contains(8), true);
  assertStrictEqual(set.contains(9), true);
  assertStrictEqual(set.contains(10), true);
  set.insert(3);
  set.insert(4);
  set.insert(1);
  set.insert(2);
  set.insert(0);
  set.insert(6);
  set.insert(12);
  set.insert(21);
  assertStrictEqual(set.length, sample.length);
  assertStrictEqual(set.contains(12), true);
  assertStrictEqual(set.contains(21), true);
  assertStrictEqual(set.contains(3), true);
  assertStrictEqual(set.contains(4), true);
  assertStrictEqual(set.contains(1), true);
  assertStrictEqual(set.contains(2), true);
  assertStrictEqual(set.contains(0), true);
  assertStrictEqual(set.contains(5), true);
  assertStrictEqual(set.contains(7), true);
  assertStrictEqual(set.contains(8), true);
  assertStrictEqual(set.contains(9), true);
  assertStrictEqual(set.contains(10), true);

  for (let i=0; i<sample.length; i++) {
    set.remove(sample[i]);
    assertStrictEqual(set.contains(sample[i]), false);
    assertStrictEqual(set.length, sample.length - i - 1);
  }
  assertStrictEqual(set.isEmpty(), true);

  set.insert(-1);
  set.insert(-9);
  assertStrictEqual(set.length, 2);
  assertStrictEqual(set.contains(-1), true);
  assertStrictEqual(set.contains(-2), false);
  assertStrictEqual(set.contains(-9), true);

  const set4 = new HashSet(obj => obj === undefined ? 333 : obj.a);
  assertStrictEqual(set4.contains(undefined), false);
  set4.insert({ a: 42 });
  set4.insert({ a: -1 });
  set4.insert(undefined);
  assertStrictEqual(set4.length, 3);
  assertStrictEqual(set4.contains({ a: 42 }), true);
  assertStrictEqual(set4.contains({ a: 13 }), false);
  assertStrictEqual(set4.contains({ a: -1 }), true);
  assertStrictEqual(set4.contains(undefined), true);
  set4.remove(undefined);
  assertStrictEqual(set4.contains(undefined), false);

  // --> ListHashSet
  const set2 = new ListHashSet();
  assertStrictEqual(set2.isEmpty(), true);
  for (let i=0; i<sample.length; i++) {
    set2.insert(sample[i]);
    assertStrictEqual(set2.contains(sample[i]), true);
    assertStrictEqual(set2.length, i + 1);
  }
  set2.insert(1);
  set2.insert(2);
  set2.insert(3);
  set2.insert(4);
  assertStrictEqual(set2.length, sample.length);
  assertStrictEqual(set2.contains(-1), false);
  assertStrictEqual(set2.contains(-2), false);
  assertStrictEqual(set2.contains(23), false);
  assertStrictEqual(set2.contains(24), false);

  const setArray2 = set2.toArray();
  assertArrayCmp(setArray2, sample, assertStrictEqual);

  set2.remove(6);
  set2.remove(6);
  assertStrictEqual(set2.length, sample.length - 1);
  assertStrictEqual(set2.contains(6), false);
  set2.remove(12);
  set2.remove(21);
  set2.remove(3);
  set2.remove(4);
  set2.remove(1);
  set2.remove(2);
  set2.remove(0);
  assertStrictEqual(set2.length, sample.length - 8);
  assertStrictEqual(set2.contains(12), false);
  assertStrictEqual(set2.contains(21), false);
  assertStrictEqual(set2.contains(3), false);
  assertStrictEqual(set2.contains(4), false);
  assertStrictEqual(set2.contains(1), false);
  assertStrictEqual(set2.contains(2), false);
  assertStrictEqual(set2.contains(0), false);
  assertStrictEqual(set2.contains(5), true);
  assertStrictEqual(set2.contains(7), true);
  assertStrictEqual(set2.contains(8), true);
  assertStrictEqual(set2.contains(9), true);
  assertStrictEqual(set2.contains(10), true);
  set2.insert(3);
  set2.insert(4);
  set2.insert(1);
  set2.insert(2);
  set2.insert(0);
  set2.insert(6);
  set2.insert(12);
  set2.insert(21);
  assertStrictEqual(set2.length, sample.length);
  assertStrictEqual(set2.contains(12), true);
  assertStrictEqual(set2.contains(21), true);
  assertStrictEqual(set2.contains(3), true);
  assertStrictEqual(set2.contains(4), true);
  assertStrictEqual(set2.contains(1), true);
  assertStrictEqual(set2.contains(2), true);
  assertStrictEqual(set2.contains(0), true);
  assertStrictEqual(set2.contains(5), true);
  assertStrictEqual(set2.contains(7), true);
  assertStrictEqual(set2.contains(8), true);
  assertStrictEqual(set2.contains(9), true);
  assertStrictEqual(set2.contains(10), true);

  for (let i=0; i<sample.length; i++) {
    set2.remove(sample[i]);
    assertStrictEqual(set2.contains(sample[i]), false);
    assertStrictEqual(set2.length, sample.length - i - 1);
  }
  assertStrictEqual(set2.isEmpty(), true);

  set2.insert(-1);
  set2.insert(-9);
  assertStrictEqual(set2.length, 2);
  assertStrictEqual(set2.contains(-1), true);
  assertStrictEqual(set2.contains(-2), false);
  assertStrictEqual(set2.contains(-9), true);

  const set3 = new ListHashSet(obj => obj.a);
  set3.insert({ a: 42 });
  set3.insert({ a: -1 });
  assertStrictEqual(set3.length, 2);
  assertStrictEqual(set3.contains({ a: 42 }), true);
  assertStrictEqual(set3.contains({ a: 13 }), false);
  assertStrictEqual(set3.contains({ a: -1 }), true);
}
