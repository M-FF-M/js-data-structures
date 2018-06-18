
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
  assertArrayCmp(setArray, sample, assertStrictEqual);

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

  const set2 = new HashSet(obj => obj.a);
  set2.insert({ a: 42 });
  set2.insert({ a: -1 });
  assertStrictEqual(set2.length, 2);
  assertStrictEqual(set2.contains({ a: 42 }), true);
  assertStrictEqual(set2.contains({ a: 13 }), false);
  assertStrictEqual(set2.contains({ a: -1 }), true);
}
