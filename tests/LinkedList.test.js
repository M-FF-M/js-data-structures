
function LinkedListTest() {
  // sample data
  const sample = [5, 7, 3, 8, 1, 2, 6, 4];
  const pushedSample = [5, 7, 3, 8, 1, 11, 45];
  const pushedSample2 = [102, -23, 8, 1, 11, 45];

  // --> LinkedList
  const list1 = new LinkedList(sample);
  const list2 = new LinkedList(1, 2, 3, 4, 5, 6, 7, 8);

  assertStrictEqual(list1.length, sample.length);
  assertStrictEqual(list2.length, 8);

  for (let i=0; i<sample.length; i++)
    assertStrictEqual(list1.get(i), sample[i]);
  for (let i=0; i<8; i++)
    assertStrictEqual(list2.get(i), i + 1);

  assertStrictEqual(list1.getBack(), 4);
  assertStrictEqual(list1.popBack(), 4);
  assertStrictEqual(list1.popBack(), 6);
  assertStrictEqual(list1.popBack(), 2);
  assertStrictEqual(list1.getBack(), 1);
  assertStrictEqual(list1.length, sample.length - 3);
  list1.pushBack(11);
  assertStrictEqual(list1.getBack(), 11);
  list1.pushBack(45);
  assertStrictEqual(list1.getBack(), 45);
  assertStrictEqual(list1.length, sample.length - 1);

  for (let i=0; i<pushedSample.length; i++)
    assertStrictEqual(list1.get(i), pushedSample[i]);
  for (let i=0; i<pushedSample.length; i++)
    assertStrictEqual(list1.popBack(), pushedSample[pushedSample.length - i - 1]);
  assertStrictEqual(list1.isEmpty(), true);
  list1.pushBack(21);
  list1.pushBack(32);
  // console.log(list1.toString());
  assertStrictEqual(list1.popBack(), 32);
  assertStrictEqual(list1.popBack(), 21);
  assertStrictEqual(list1.isEmpty(), true);
  
  assertStrictEqual(list2.getBack(), 8);
  assertStrictEqual(list2.popBack(), 8);
  assertStrictEqual(list2.popBack(), 7);
  assertStrictEqual(list2.popBack(), 6);
  assertStrictEqual(list2.getBack(), 5);
  assertStrictEqual(list2.length, 8 - 3);
  list2.pushBack(11);
  assertStrictEqual(list2.getBack(), 11);
  list2.pushBack(45);
  assertStrictEqual(list2.getBack(), 45);
  assertStrictEqual(list2.length, 8 - 1);
  list2.removeIdx(8 - 2);
  list2.removeIdx(0);
  assertStrictEqual(list2.length, 8 - 3);
  assertStrictEqual(list2.getBack(), 11);
  assertStrictEqual(list2.removeObj(11), true);
  assertStrictEqual(list2.removeObj(1), false);
  assertStrictEqual(list2.length, 8 - 4);
  assertStrictEqual(list2.get(0), 2);
  assertStrictEqual(list2.contains(11), false);
  assertStrictEqual(list2.contains(0), false);
  assertStrictEqual(list2.contains(3), true);
  
  // --> DoublyLinkedList
  const list3 = new DoublyLinkedList(sample);
  const list4 = new DoublyLinkedList(1, 2, 3, 4, 5, 6, 7, 8);

  assertStrictEqual(list3.length, sample.length);
  assertStrictEqual(list4.length, 8);

  for (let i=0; i<sample.length; i++)
    assertStrictEqual(list3.get(i), sample[i]);
  for (let i=0; i<8; i++)
    assertStrictEqual(list4.get(i), i + 1);

  assertStrictEqual(list3.getBack(), 4);
  assertStrictEqual(list3.popBack(), 4);
  assertStrictEqual(list3.popBack(), 6);
  assertStrictEqual(list3.popBack(), 2);
  assertStrictEqual(list3.getBack(), 1);
  assertStrictEqual(list3.length, sample.length - 3);
  list3.pushBack(11);
  assertStrictEqual(list3.getBack(), 11);
  list3.pushBack(45);
  assertStrictEqual(list3.getBack(), 45);
  assertStrictEqual(list3.length, sample.length - 1);
  
  assertStrictEqual(list3.getFront(), 5);
  assertStrictEqual(list3.popFront(), 5);
  assertStrictEqual(list3.popFront(), 7);
  assertStrictEqual(list3.popFront(), 3);
  assertStrictEqual(list3.getFront(), 8);
  assertStrictEqual(list3.length, sample.length - 4);
  list3.pushFront(-23);
  assertStrictEqual(list3.getFront(), -23);
  list3.pushFront(102);
  assertStrictEqual(list3.getFront(), 102);
  assertStrictEqual(list3.length, sample.length - 2);
  
  for (let i=0; i<pushedSample2.length; i++)
    assertStrictEqual(list3.get(i), pushedSample2[i]);
  for (let i=0; i<pushedSample2.length; i++)
    assertStrictEqual(list3.popBack(), pushedSample2[pushedSample2.length - i - 1]);
  assertStrictEqual(list3.isEmpty(), true);
  list3.pushBack(21);
  list3.pushFront(-21);
  list3.pushBack(32);
  list3.pushFront(-32);
  assertStrictEqual(list3.popFront(), -32);
  assertStrictEqual(list3.popFront(), -21);
  assertStrictEqual(list3.isEmpty(), false);
  assertStrictEqual(list3.popFront(), 21);
  assertStrictEqual(list3.popFront(), 32);
  assertStrictEqual(list3.isEmpty(), true);
  
  assertStrictEqual(list4.getBack(), 8);
  assertStrictEqual(list4.popBack(), 8);
  assertStrictEqual(list4.popBack(), 7);
  assertStrictEqual(list4.popBack(), 6);
  assertStrictEqual(list4.getBack(), 5);
  // console.log(list4.toString());
  assertStrictEqual(list4.length, 8 - 3);
  list4.pushBack(11);
  assertStrictEqual(list4.getBack(), 11);
  list4.pushBack(45);
  assertStrictEqual(list4.getBack(), 45);
  assertStrictEqual(list4.length, 8 - 1);
  list4.removeIdx(8 - 2);
  list4.removeIdx(0);
  assertStrictEqual(list4.length, 8 - 3);
  assertStrictEqual(list4.getBack(), 11);
  assertStrictEqual(list4.removeObj(11), true);
  assertStrictEqual(list4.removeObj(1), false);
  assertStrictEqual(list4.length, 8 - 4);
  assertStrictEqual(list4.getFront(), 2);
  assertStrictEqual(list4.get(1), 3);
  assertStrictEqual(list4.get(2), 4);
  assertStrictEqual(list4.contains(11), false);
  assertStrictEqual(list4.contains(0), false);
  assertStrictEqual(list4.contains(3), true);

  const list5 = new DoublyLinkedList();
  const lnkArr = [];
  for (let i=0; i<sample.length; i++) {
    lnkArr[i] = list5.pushBack(sample[i]);
    assertStrictEqual(list5.contains(sample[i]), true);
  }
  list5.removeLink(lnkArr[5]);
  list5.removeLink(lnkArr[3]);
  list5.removeLink(lnkArr[0]);
  list5.removeLink(lnkArr[sample.length - 1]);
  for (let i=0; i<sample.length; i++) {
    if (i != 0 && i != 3 && i != 5 && i != sample.length - 1) assertStrictEqual(list5.contains(sample[i]), true);
    else assertStrictEqual(list5.contains(sample[i]), false);
  }
  assertStrictEqual(list5.length, sample.length - 4);
  list5.insertBefore(lnkArr[6], sample[5]);
  const middleLink = list5.insertAfter(lnkArr[2], sample[3]);
  const firstLink = list5.insertBefore(lnkArr[1], sample[0]);
  const lastLink = list5.insertAfter(lnkArr[sample.length - 2], sample[sample.length - 1]);
  assertStrictEqual(list5.length, sample.length);
  for (let i=0; i<sample.length; i++) {
    assertStrictEqual(list5.contains(sample[i]), true);
  }

  const nLink = list5.insertBefore(middleLink, 42);
  assertStrictEqual(list5.contains(42), true);
  list5.removeLink(nLink);
  assertStrictEqual(list5.contains(42), false);

  const dblLink = new DoubleLink(43, null, null);
  list5.insertLinkAfter(middleLink, dblLink);
  assertStrictEqual(list5.contains(43), true);
  list5.removeLink(dblLink);
  assertStrictEqual(list5.contains(43), false);
  list5.insertLinkBefore(middleLink, dblLink);
  assertStrictEqual(list5.contains(43), true);
  list5.removeLink(dblLink);
  assertStrictEqual(list5.contains(43), false);
  list5.insertLinkBefore(firstLink, dblLink);
  assertStrictEqual(list5.contains(43), true);
  list5.removeLink(dblLink);
  assertStrictEqual(list5.contains(43), false);
  list5.insertLinkAfter(lastLink, dblLink);
  assertStrictEqual(list5.contains(43), true);
  list5.removeLink(dblLink);
  assertStrictEqual(list5.contains(43), false);

  const listArr = list5.toArray();
  assertArrayCmp(sample, listArr, assertStrictEqual);
}
