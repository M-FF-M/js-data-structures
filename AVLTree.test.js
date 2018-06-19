
function getLeftHeight(avlTree) {
  if (avlTree.left == null) return 0;
  else return Math.max(getLeftHeight(avlTree.left), getRightHeight(avlTree.left)) + 1;
}

function getRightHeight(avlTree) {
  if (avlTree.right == null) return 0;
  else return Math.max(getLeftHeight(avlTree.right), getRightHeight(avlTree.right)) + 1;
}

function getHeightDiff(avlTree) {
  return getRightHeight(avlTree) - getLeftHeight(avlTree);
}

function printErr(avlTree, err) {
  console.warn("! AVL tree --> Inconsistency detected:");
  console.warn("Current node: " + avlTree.key.data);
  console.warn(err);
}

function validAVL(avlTree) {
  const h1 = getLeftHeight(avlTree), h2 = getRightHeight(avlTree);
  if (h1 != avlTree.leftHeight() || h2 != avlTree.rightHeight()) {
    printErr(avlTree, "Unexpected height difference: getLeftHeight(): " + h1 + ", leftHeight(): " + avlTree.leftHeight()
      + ", getRightHeight(): " + h2 + ", rightHeight(): " + avlTree.rightHeight());
    return false;
  }
  if (getHeightDiff(avlTree) != avlTree.balance) {
    printErr(avlTree, "Unexpected balance difference: getHeightDiff(): " + getHeightDiff(avlTree) + ", balance: " + avlTree.balance);
    return false;
  }
  if (Math.abs(h1 - h2) > 1) {
    printErr(avlTree, "Tree not balanced: h1 - h2: " + (h1 - h2));
    return false;
  }
  let a = avlTree.key.data, b = avlTree.key.data;
  if (avlTree.left != null) {
    a = avlTree.left.findRightChild(null, false, false).key.data;
  }
  if (avlTree.right != null) {
    b = avlTree.right.findLeftChild();
    if (avlTree.cmpFct(b, avlTree.key.data) == 0) {
      printErr(avlTree, "Keys not sorted: key: " + avlTree.key.data + ", b: " + b);
      return false;
    }
  }
  if (avlTree.cmpFct(a, avlTree.key.data) > 0 || avlTree.cmpFct(b, avlTree.key.data) < 0) {
    printErr(avlTree, "Keys not sorted: a: " + a + ", key: " + avlTree.key.data + ", b: " + b);
    return false;
  }
  if (avlTree.left != null && avlTree.right != null) return validAVL(avlTree.left) && validAVL(avlTree.right);
  if (avlTree.left != null) return validAVL(avlTree.left);
  if (avlTree.right != null) return validAVL(avlTree.right);
  else return true;
}

function validAVLTree(avlTree) {
  if (avlTree.root == null) return true;
  else return validAVL(avlTree.root);
}

function AVLTreeTest() {
  // sample data
  const sample = [15, 5, 22, 7, 3, 18, 8, 16, 1, 2, 6, 21, 19, 20, 17, 4, 9, 11, 14, 10, 0, 13, 12];
  const sample_sorted = sample.slice().sort((a, b) => a - b);
  const sample_sorted_reversed = sample.slice().sort((a, b) => b - a);

  // --> AVLTree
  const avlT = new AVLTree();
  assertStrictEqual(avlT.isEmpty(), true);
  for (let i=0; i<sample.length; i++) {
    avlT.insert(sample[i]);
    assertStrictEqual(avlT.contains(sample[i]), true);
    assertStrictEqual(avlT.length, i + 1);
    validAVLTree(avlT);
  }
  avlT.insert(1);
  avlT.insert(2);
  avlT.insert(3);
  avlT.insert(4);
  assertStrictEqual(avlT.length, sample.length);
  assertStrictEqual(avlT.contains(-1), false);
  assertStrictEqual(avlT.contains(-2), false);
  assertStrictEqual(avlT.contains(23), false);
  assertStrictEqual(avlT.contains(24), false);
  validAVLTree(avlT);

  const avlArray = avlT.toArray();
  assertArrayCmp(avlArray, sample_sorted, assertStrictEqual);

  //console.log(avlT.toString());

  avlT.remove(6);
  avlT.remove(6);
  assertStrictEqual(avlT.length, sample.length - 1);
  assertStrictEqual(avlT.contains(6), false);
  validAVLTree(avlT);
  avlT.remove(12);
  avlT.remove(21);
  avlT.remove(3);
  avlT.remove(4);
  avlT.remove(1);
  avlT.remove(2);
  avlT.remove(0);
  assertStrictEqual(avlT.length, sample.length - 8);
  assertStrictEqual(avlT.contains(12), false);
  assertStrictEqual(avlT.contains(21), false);
  assertStrictEqual(avlT.contains(3), false);
  assertStrictEqual(avlT.contains(4), false);
  assertStrictEqual(avlT.contains(1), false);
  assertStrictEqual(avlT.contains(2), false);
  assertStrictEqual(avlT.contains(0), false);
  assertStrictEqual(avlT.contains(5), true);
  assertStrictEqual(avlT.contains(7), true);
  assertStrictEqual(avlT.contains(8), true);
  assertStrictEqual(avlT.contains(9), true);
  assertStrictEqual(avlT.contains(10), true);
  validAVLTree(avlT);
  avlT.insert(3);
  avlT.insert(4);
  avlT.insert(1);
  avlT.insert(2);
  avlT.insert(0);
  avlT.insert(6);
  avlT.insert(12);
  avlT.insert(21);
  assertStrictEqual(avlT.length, sample.length);
  assertStrictEqual(avlT.contains(12), true);
  assertStrictEqual(avlT.contains(21), true);
  assertStrictEqual(avlT.contains(3), true);
  assertStrictEqual(avlT.contains(4), true);
  assertStrictEqual(avlT.contains(1), true);
  assertStrictEqual(avlT.contains(2), true);
  assertStrictEqual(avlT.contains(0), true);
  assertStrictEqual(avlT.contains(5), true);
  assertStrictEqual(avlT.contains(7), true);
  assertStrictEqual(avlT.contains(8), true);
  assertStrictEqual(avlT.contains(9), true);
  assertStrictEqual(avlT.contains(10), true);
  validAVLTree(avlT);

  const avlArray2 = avlT.toArray();
  assertArrayCmp(avlArray2, sample_sorted, assertStrictEqual);

  for (let i=0; i<sample.length; i++) {
    avlT.remove(sample[i]);
    assertStrictEqual(avlT.contains(sample[i]), false);
    assertStrictEqual(avlT.length, sample.length - i - 1);
    validAVLTree(avlT);
  }
  assertStrictEqual(avlT.isEmpty(), true);

  const avlT2 = new TreeSet((a, b) => b - a);
  assertStrictEqual(avlT2.isEmpty(), true);
  for (let i=0; i<sample.length; i++) {
    avlT2.insert(sample[i]);
    assertStrictEqual(avlT2.contains(sample[i]), true);
    assertStrictEqual(avlT2.length, i + 1);
    validAVLTree(avlT2);
  }
  avlT2.insert(1);
  avlT2.insert(2);
  avlT2.insert(3);
  avlT2.insert(4);
  assertStrictEqual(avlT2.length, sample.length);
  assertStrictEqual(avlT2.contains(-1), false);
  assertStrictEqual(avlT2.contains(-2), false);
  assertStrictEqual(avlT2.contains(23), false);
  assertStrictEqual(avlT2.contains(24), false);
  validAVLTree(avlT2);

  const avlArray3 = avlT2.toArray();
  assertArrayCmp(avlArray3, sample_sorted_reversed, assertStrictEqual);
}
