/**
 * An AVL tree
 * @template CompareType The types beeing compared
 * @template {CompareType} DataType
 */
class AVLTreeNode {
  /**
   * Construct a new AVLTreeNode
   * @param {(a: CompareType, b: CompareType) => number} cmpFct the comparison function
   * @param {DoubleLink<DataType>} key the wrapper of the key / element to insert into this tree
   */
  constructor(cmpFct, key) {
    this._cmpFct = cmpFct;
    /**
     * the height of this AVL tree
     * @type {number}
     */
    this.h = 0;
    /**
     * the wrapper of the key / element of this node
     * @type {DoubleLink<DataType>}
     */
    this.key = key;
    /**
     * the balance of the subtrees of this node
     * @type {number}
     */
    this.balance = 0;
    /**
     * the left child of this node
     * @type {AVLTreeNode<CompareType, DataType>}
     */
    this.left = null;
    /**
     * the right child of this node
     * @type {AVLTreeNode<CompareType, DataType>}
     */
    this.right = null;
  }

  /**
   * Get the height of this AVL tree
   * @return {number} the height of this AVL tree (in edges)
   */
  height() {
    return this.h;
  }

  _leftHeight() {
    if (this.left == null) return 0;
    else return this.left.height() + 1;
  }

  _rightHeight() {
    if (this.right == null) return 0;
    else return this.right.height() + 1;
  }

  _heightDiff() {
    return this.balance = this._rightHeight() - this._leftHeight();
  }

  /**
   * Search for a key / element in this tree
   * @param {CompareType} key the key / element to search for
   * @return {boolean} true if the key / element was found
   */
  find(key) {
    if (this._cmpFct(key, this.key.data) == 0) return true;
    if (this._cmpFct(key, this.key.data) > 0) {
      if (this.right != null) return this.right.find(key);
      else return false;
    } else {
      if (this.left != null) return this.left.find(key);
      else return false;
    }
  }

  /**
   * Search for the rightmost node in this tree
   * @param {AVLTreeNode<CompareType, DataType>} parent the root / parent node
   * @param {boolean} rightChild should be true if this node is the right child of the parent node
   * @param {boolean} removeChild whether to remove the rightmost node
   * @return {AVLTreeNode<CompareType, DataType>} the rightmost node
   */
  findRightChild(parent, rightChild, removeChild) {
    if (this.right != null) {
      const ret = this.right.findRightChild(this, true, removeChild);
      if (removeChild) {
        this.h = Math.max(this._leftHeight(), this._rightHeight());
        this._heightDiff();
        if (parent == null) throw new Error("Can't rebalance tree without knowing the parent node");
        if (rightChild)
          parent.right = this.checkForValidity();
        else
          parent.left = this.checkForValidity();
      }
      return ret;
    } else {
      const ret = this;
      if (removeChild) {
        if (parent == null) throw new Error("Can't remove node without knowing the parent node");
        if (this.left != null) {
          if (rightChild) parent.right = this.left;
          else parent.left = this.left;
          this.left = null; this.right = null;
        } else {
          if (rightChild) parent.right = null;
          else parent.left = null;
          this.left = null; this.right = null;
        }
        this.h = 0;
      }
      return ret;
    }
  }

  /**
   * Search for the leftmost node in this tree
   * @return {DataType} the value of the leftmost node
   */
  findLeftChild() {
    if (this.left != null) {
      return this.left.findLeftChild();
    } else {
      return this.key.data;
    }
  }

  /**
   * Insert a new key / element into this tree
   * @param {DoubleLink<DataType>} key the wrapper of the key / element to insert
   * @param {DoublyLinkedList<DataType>} list the list with all the keys / elements
   */
  insert(key, list) {
    const r = this.insertHelper(key, list);
    if (r != this) { throw new Error("Insert requested a parent node change. Use insertHelper instead."); }
  }

  /**
   * Remove a key / element from this tree
   * @param {any} key the key / element to remove
   * @param {DoublyLinkedList<DataType>} list the list with all the keys / elements
   */
  remove(key, list) {
    const r = this.removeHelper(key, list);
    if (r != this) { throw new Error("Remove requested a parent node change. Use removeHelper instead."); }
  }

  /**
   * Insert a new key / element into this tree
   * @param {DoubleLink<DataType>} key the wrapper of the key / element to insert
   * @param {DoublyLinkedList<DataType>} list the list with all the keys / elements
   * @return {AVLTreeNode<CompareType, DataType>} the new root node of this tree
   */
  insertHelper(key, list) {
    if (this._cmpFct(key.data, this.key.data) == 0) return this;
    if (this._cmpFct(key.data, this.key.data) > 0) {
      if (this.right != null) {
        this.right = this.right.insertHelper(key, list);
      } else {
        list.insertLinkAfter(this.key, key);
        this.right = new AVLTreeNode(this._cmpFct, key);
      }
    } else {
      if (this.left != null) {
        this.left = this.left.insertHelper(key, list);
      } else {
        list.insertLinkBefore(this.key, key);
        this.left = new AVLTreeNode(this._cmpFct, key);
      }
    }
    this.h = Math.max(this._leftHeight(), this._rightHeight());
    this._heightDiff();
    return this.checkForValidity();
  }

  /**
   * Remove a key / element from this tree
   * @param {CompareType} key the key / element to remove
   * @param {DoublyLinkedList<DataType>} list the list with all the keys / elements
   * @return {AVLTreeNode<CompareType, DataType>} the new root node of this tree
   */
  removeHelper(key, list) {
    if (this._cmpFct(key, this.key.data) == 0) {
      list.removeLink(this.key);
      if (this.left != null && this.right != null) {
        const nRoot = this.left.findRightChild(this, false, true);
        nRoot.left = this.left; nRoot.right = this.right;
        nRoot.h = Math.max(nRoot._leftHeight(), nRoot._rightHeight());
        nRoot._heightDiff();
        return nRoot.checkForValidity();
      }
      if (this.left != null) return this.left;
      if (this.right != null) return this.right;
      return null;
    }
    if (this._cmpFct(key, this.key.data) > 0) {
      if (this.right != null) {
        this.right = this.right.removeHelper(key, list);
      }
    } else {
      if (this.left != null) {
        this.left = this.left.removeHelper(key, list);
      }
    }
    this.h = Math.max(this._leftHeight(), this._rightHeight());
    this._heightDiff();
    return this.checkForValidity();
  }

  /**
   * Check whether this is a valid AVL tree and roatate if necessary
   * @return {AVLTreeNode<CompareType, DataType>} the new root node of this tree
   */
  checkForValidity() {
    if (Math.abs(this._heightDiff()) <= 1) return this;
    let tmp_right = this.right;
    let swappedLR = false; let swapMult = 1;
    if (this._heightDiff() < 0) {
      tmp_right = this.left;
      swappedLR = true;
      swapMult = -1;
    }
    if (tmp_right._heightDiff() * swapMult >= 0) { // single rotation
      const lc = tmp_right.left;
      const rc = tmp_right.right;
      if (swappedLR) {
        const o_left = this.left;
        this.left = rc;
        this.h = Math.max(this._leftHeight(), this._rightHeight()); this._heightDiff();
        o_left.left = lc;
        o_left.right = this;
        o_left.h = Math.max(o_left._leftHeight(), o_left._rightHeight()); o_left._heightDiff();
        return o_left;
      } else {
        const o_right = this.right;
        this.right = lc;
        this.h = Math.max(this._leftHeight(), this._rightHeight()); this._heightDiff();
        o_right.left = this;
        o_right.right = rc;
        o_right.h = Math.max(o_right._leftHeight(), o_right._rightHeight()); o_right._heightDiff();
        return o_right;
      }
    } else { // double rotation
      const lc = tmp_right.left;
      const rc = tmp_right.right;
      if (swappedLR) {
        const o_left = this.left;
        const rlc = rc.left;
        const rrc = rc.right;
        this.left = rrc;
        this.h = Math.max(this._leftHeight(), this._rightHeight()); this._heightDiff();
        o_left.right = rlc;
        o_left.h = Math.max(o_left._leftHeight(), o_left._rightHeight()); o_left._heightDiff();
        rc.left = o_left;
        rc.right = this;
        rc.h = Math.max(rc._leftHeight(), rc._rightHeight()); rc._heightDiff();
        return rc;
      } else {
        const o_right = this.right;
        const llc = lc.left;
        const lrc = lc.right;
        this.right = llc;
        this.h = Math.max(this._leftHeight(), this._rightHeight()); this._heightDiff();
        o_right.left = lrc;
        o_right.h = Math.max(o_right._leftHeight(), o_right._rightHeight()); o_right._heightDiff();
        lc.left = this;
        lc.right = o_right;
        lc.h = Math.max(lc._leftHeight(), lc._rightHeight()); lc._heightDiff();
        return lc;
      }
    }
  }

  /**
   * Convert this AVL tree into a string (Graphviz format)
   * @return {string} the string representation
   */
  toString() {
    return this._dotNode(0)[0];
  }

  _dotNode(idx) {
    let ret = '\t' + idx + ' [label="' + this.key.data + ', b=' + this.balance + '"];\n';
    let next = idx + 1;
    if (this.left != null) {
      const [r, n] = this.left._dotLink(idx, next, "l");
      ret += r; next = n;
    }
    if (this.right != null) {
      const [r, n] = this.right._dotLink(idx, next, "r");
      ret += r; next = n;
    }
    return [ret, next];
  }

  _dotLink(idx, next, label) {
    let ret = '\t' + idx + ' -> ' + next + ' [label="' + label + '"];\n';
    const [r, n] = this._dotNode(next);
    ret += r; next = n;
    return [ret, next];
  }
}

/**
 * An AVL tree
 * @template CompareType The types beeing compared 
 * @template {CompareType} DataType
 */
class AVLTree {
  /**
   * Create a new AVL tree
   * @param {(a: CompareType, b: CompareType) => number} [cmpFct] the comparison function
   */
  constructor(cmpFct = (a, b) => a - b) {
    this._cmpFct = cmpFct;
    /**
     * @type {AVLTreeNode<CompareType, DataType>}
     */
    this._root = null;
    /**
     * @type {DoublyLinkedList<DataType>}
     */
    this._list = new DoublyLinkedList();
  }

  /**
   * the number of elements in this AVL tree
   * @type {number}
   */
  get length() {
    return this._list.length;
  }

  /**
   * Insert a new key / element into this AVL tree
   * @param {DataType} key the key / element to be inserted
   */
  insert(key) {
    if (this._root == null) {
      const dbl = this._list.pushBack(key);
      this._root = new AVLTreeNode(this._cmpFct, dbl);
    } else {
      const dbl = new DoubleLink(key, null, null);
      this._root = this._root.insertHelper(dbl, this._list);
    }
  }

  /**
   * Remove a key / element from this AVL tree
   * @param {CompareType} key the key / element to be removed
   */
  remove(key) {
    if (this._root == null) return;
    if (this.length == 1) {
      if (this._root.key.data == key) {
        this._list.popBack();
        this._root = null;
      }
    } else {
      this._root = this._root.removeHelper(key, this._list);
    }
  }

  /**
   * Search for a key / element in this AVL tree
   * @param {CompareType} key the key / element to search for
   * @return {boolean} true if the key / element was found
   */
  find(key) {
    if (this._root == null) return false;
    else return this._root.find(key);
  }

  /**
   * Check whether a key / element is contained in this AVL tree
   * @param {CompareType} key the key / element to search for
   * @return {boolean} true if the key / element was found
   */
  contains(key) {
    return this.find(key);
  }

  /**
   * Converts this AVL tree into an array
   * @return {DataType[]} the array with the tree elements
   */
  toArray() {
    return this._list.toArray();
  }

  /**
   * Convert this AVL tree into a string (Graphviz format)
   * @return {string} the string representation
   */
  toString() {
    let ret = 'digraph {\n';
    if (this._root != null)
      ret += this._root.toString();
    ret += '}';
    return ret;
  }
  
  /**
   * Returns whether or not this AVL tree is empty
   * @return {boolean} true if the AVL tree is empty
   */
  isEmpty() {
    return this.length == 0;
  }
}

/**
 * A tree set
 * @template CompareType The types beeing compared 
 * @template {CompareType} DataType
 */
class TreeSet extends AVLTree {
  /**
   * Create a new tree set
   * @param {(a: CompareType, b: CompareType) => number} [cmpFct] the comparison function
   */
  constructor(cmpFct = (a, b) => a - b) {
    super(cmpFct);
  }
}
