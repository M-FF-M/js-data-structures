
function QueueTest() {
  // sample data
  const sample = [5, 7, 3, 8, 1, 2, 6, 4];
  const pushedSample = [102, -23, 8, 1, 11, 45];
  
  // --> Queue
  const queue1 = new Queue(sample);
  const queue2 = new Queue(1, 2, 3, 4, 5, 6, 7, 8);

  assertStrictEqual(queue1.length, sample.length);
  assertStrictEqual(queue2.length, 8);

  for (let i=0; i<sample.length; i++)
    assertStrictEqual(queue1.get(i), sample[i]);
  for (let i=0; i<8; i++)
    assertStrictEqual(queue2.get(i), i + 1);

  assertStrictEqual(queue1.getBack(), 4);
  assertStrictEqual(queue1.popBack(), 4);
  assertStrictEqual(queue1.popBack(), 6);
  assertStrictEqual(queue1.popBack(), 2);
  assertStrictEqual(queue1.getBack(), 1);
  assertStrictEqual(queue1.length, sample.length - 3);
  queue1.pushBack(11);
  assertStrictEqual(queue1.getBack(), 11);
  queue1.pushBack(45);
  assertStrictEqual(queue1.getBack(), 45);
  assertStrictEqual(queue1.length, sample.length - 1);
  
  assertStrictEqual(queue1.getFront(), 5);
  assertStrictEqual(queue1.popFront(), 5);
  assertStrictEqual(queue1.popFront(), 7);
  assertStrictEqual(queue1.popFront(), 3);
  assertStrictEqual(queue1.getFront(), 8);
  assertStrictEqual(queue1.length, sample.length - 4);
  queue1.pushFront(-23);
  assertStrictEqual(queue1.getFront(), -23);
  queue1.pushFront(102);
  assertStrictEqual(queue1.getFront(), 102);
  assertStrictEqual(queue1.length, sample.length - 2);
  
  for (let i=0; i<pushedSample.length; i++)
    assertStrictEqual(queue1.get(i), pushedSample[i]);
  for (let i=0; i<pushedSample.length; i++)
    assertStrictEqual(queue1.popBack(), pushedSample[pushedSample.length - i - 1]);
  assertStrictEqual(queue1.isEmpty(), true);
  queue1.pushBack(21);
  queue1.pushFront(-21);
  queue1.pushBack(32);
  queue1.pushFront(-32);
  assertStrictEqual(queue1.popFront(), -32);
  assertStrictEqual(queue1.popFront(), -21);
  assertStrictEqual(queue1.isEmpty(), false);
  assertStrictEqual(queue1.popFront(), 21);
  assertStrictEqual(queue1.popFront(), 32);
  assertStrictEqual(queue1.isEmpty(), true);
  
  assertStrictEqual(queue2.getBack(), 8);
  assertStrictEqual(queue2.popBack(), 8);
  assertStrictEqual(queue2.popBack(), 7);
  assertStrictEqual(queue2.popBack(), 6);
  assertStrictEqual(queue2.getBack(), 5);
  assertStrictEqual(queue2.length, 8 - 3);
  queue2.pushBack(11);
  assertStrictEqual(queue2.getBack(), 11);
  queue2.pushBack(45);
  assertStrictEqual(queue2.getBack(), 45);
  assertStrictEqual(queue2.length, 8 - 1);
  queue2.removeIdx(8 - 2);
  queue2.removeIdx(0);
  // console.log(queue2.toString());
  assertStrictEqual(queue2.length, 8 - 3);
  assertStrictEqual(queue2.getBack(), 11);
  assertStrictEqual(queue2.removeObj(11), true);
  assertStrictEqual(queue2.removeObj(1), false);
  assertStrictEqual(queue2.length, 8 - 4);
  assertStrictEqual(queue2.getFront(), 2);
  assertStrictEqual(queue2.get(1), 3);
  assertStrictEqual(queue2.get(2), 4);
  assertStrictEqual(queue2.contains(11), false);
  assertStrictEqual(queue2.contains(0), false);
  assertStrictEqual(queue2.contains(3), true);

  // sample data
  const front_sample = [4, 7, 1, 3, 5, 10, 22, -12, 45, -2, 3, 87, 17, 2, -22, 89, 45, 76, 102, 22,
    13, -333, -12, -50, -12, -17, 35, 1];
  const back_sample = [8, 2, 12, -34, 2, 11, -3, -19, 12, 22, -1055, 3, 12, -1, -9, 7, 1, 1, 12, 45,
    56, -12, 1234, 88, 56, -3, -5, -7];
  
  // --> Queue
  const queue3 = new Queue();
  for (let i=0; i<front_sample.length * 2; i++) {
    if (i % 2 == 0) queue3.pushFront(front_sample[i / 2]);
    else queue3.pushBack(back_sample[Math.floor(i / 2)]);
  }
  for (let i=0; i<front_sample.length * 2; i++) {
    if (i < front_sample.length) assertStrictEqual(queue3.get(i), front_sample[front_sample.length - i - 1]);
    else assertStrictEqual(queue3.get(i), back_sample[i - front_sample.length]);
  }
  assertStrictEqual(queue3.length, front_sample.length * 2);
  for (let i=0; i<front_sample.length; i++) {
    assertStrictEqual(queue3.popFront(), front_sample[front_sample.length - i - 1]);
  }
  for (let i=0; i<back_sample.length; i++) {
    assertStrictEqual(queue3.popBack(), back_sample[back_sample.length - i - 1]);
  }
  assertStrictEqual(queue3.isEmpty(), true);
}
