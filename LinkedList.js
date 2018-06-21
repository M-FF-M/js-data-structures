
/**
 * A wrapper for objects in a linked list
 */
class SingleLink {
  /**
   * Create a new wrapped object
   * @param {any} data the object that is being wrapped
   * @param {SingleLink} [next] the next object in the list
   */
  constructor(data, next) {
    /**
     * the wrapped object
     * @type {any}
     */
    this.data = data;
    /**
     * the next object in the list
     * @type {SingleLink}
     */
    this.next = next;
  }
}

/**
 * A wrapper for objects in a doubly linked list
 */
class DoubleLink {
  /**
   * Create a new wrapped object
   * @param {any} data the object that is being wrapped
   * @param {DoubleLink} [last] the previous object in the list
   * @param {DoubleLink} [next] the next object in the list
   */
  constructor(data, last, next) {
    /**
     * the wrapped object
     * @type {any}
     */
    this.data = data;
    /**
     * the previous object in the list
     * @type {DoubleLink}
     */
    this.last = last;
    /**
     * the next object in the list
     * @type {DoubleLink}
     */
    this.next = next;
  }
}

/**
 * A linked list
 */
class LinkedList {
  /**
   * Constructs a new linked list
   * @param {any[]} [elems] the elements to insert into this list
   */
  constructor(...elems) {
    if (elems.length == 1 && (elems[0] instanceof Array)) {
      elems = elems[0];
    }
    /**
     * the number of elements in this list
     * @type {number}
     */
    this.length = 0;
    /**
     * the first element in the list (in this case, the back of the 'stack')
     * @type {SingleLink}
     */
    this.first = null;
    if (elems.length > 0) {
      elems = elems.slice().reverse();
      this.length = elems.length;
      this.first = new SingleLink(elems[0], null);
      let cur = this.first;
      for (let i=1; i<this.length; i++) {
        cur.next = new SingleLink(elems[i], null);
        cur = cur.next;
      }
    }
  }

  /**
   * Get an element at a specific index (indices work as expected, even though the list
   * is actually reversed in memory)
   * @param {number} idx the index
   * @return {any} the element at the specified index
   */
  get(idx) {
    if (idx < 0) throw new RangeError('LinkedList: index ' + idx + ' is out of bounds '
      + 'length is ' + this.length + '.');
    if (idx >= this.length) throw new RangeError('LinkedList: index ' + idx + ' is out of bounds '
      + 'length is ' + this.length + '.');
    idx = this.length - idx - 1;
    let cur = this.first;
    for (let i=0; i<this.length; i++) {
      if (i == idx) {
        return cur.data;
      }
      cur = cur.next;
    }
  }

  /**
   * Remove an element at a specific index (indices work as expected, even though the list
   * is actually reversed in memory)
   * @param {number} idx the index
   */
  removeIdx(idx) {
    if (idx < 0) throw new RangeError('LinkedList: index ' + idx + ' is out of bounds '
      + 'length is ' + this.length + '.');
    if (idx >= this.length) throw new RangeError('LinkedList: index ' + idx + ' is out of bounds '
      + 'length is ' + this.length + '.');
    idx = this.length - idx - 1;
    if (idx == 0) {
      this.first = this.first.next;
    } else {
      let last = this.first;
      let cur = this.first.next;
      for (let i=1; i<this.length; i++) {
        if (i == idx) {
          last.next = cur.next;
          break;
        }
        last = cur;
        cur = cur.next;
      }
    }
    this.length--;
  }

  /**
   * Remove a specific element
   * @param {any} obj the element
   * @return {boolean} true if the element was contained in this list
   */
  removeObj(obj) {
    let found = false;
    if (obj === this.first.data) {
      this.first = this.first.next;
      found = true;
    } else {
      let last = this.first;
      let cur = this.first.next;
      for (let i=1; i<this.length; i++) {
        if (obj === cur.data) {
          last.next = cur.next;
          found = true;
          break;
        }
        last = cur;
        cur = cur.next;
      }
    }
    if (found) this.length--;
    return found;
  }

  /**
   * Check whether an element is contained in this list
   * @param {any} obj the element
   * @return {boolean} true if the element is contained in this list
   */
  contains(obj) {
    let cur = this.first;
    for (let i=0; i<this.length; i++) {
      if (obj === cur.data) {
        return true;
      }
      cur = cur.next;
    }
    return false;
  }

  /**
   * Add an element to the end of this 'stack' (actually the beginning of the list)
   * @param {any} obj the element to add
   */
  pushBack(obj) {
    this.first = new SingleLink(obj, this.first);
    this.length++;
  }

  /**
   * Get the last element of this 'stack' (actually the first element of the list)
   * @return {any} obj last element
   */
  getBack() {
    if (this.length == 0) throw new RangeError('LinkedList: cannot get last element from empty list.');
    return this.first.data;
  }

  /**
   * Get and remove the last element of this 'stack' (actually the first element of the list)
   * @return {any} obj last element
   */
  popBack() {
    if (this.length == 0) throw new RangeError('LinkedList: cannot pop last element from empty list.');
    const ret = this.first.data;
    this.first = this.first.next;
    this.length--;
    return ret;
  }

  /**
   * Returns whether or not this list is empty
   * @return {boolean} true if the list is empty
   */
  isEmpty() {
    return this.length == 0;
  }

  /**
   * Converts this list into a string
   * @return {string} the string representation
   */
  toString() {
    let ret = "]";
    let cur = this.first;
    for (let i=0; i<this.length; i++) {
      if (i > 0) ret = ", " + ret;
      ret = cur.data + ret;
      cur = cur.next;
    }
    ret = "LinkedList: [" + ret;
    return ret;
  }
}

/**
 * A doubly linked list
 */
class DoublyLinkedList {
  /**
   * Constructs a new doubly linked list
   * @param {any[]} [elems] the elements to insert into this list
   */
  constructor(...elems) {
    if (elems.length == 1 && (elems[0] instanceof Array)) {
      elems = elems[0];
    }
    /**
     * the number of elements in this list
     * @type {number}
     */
    this.length = 0;
    /**
     * the first element in the list
     * @type {DoubleLink}
     */
    this.first = null;
    /**
     * the last element in the list
     * @type {DoubleLink}
     */
    this.last = null;
    if (elems.length > 0) {
      this.length = elems.length;
      this.first = new DoubleLink(elems[0], null, null);
      let cur = this.first;
      for (let i=1; i<this.length; i++) {
        cur.next = new DoubleLink(elems[i], cur, null);
        cur = cur.next;
      }
      this.last = cur;
    }
  }

  /**
   * Get an element at a specific index
   * @param {number} idx the index
   * @return {any} the element at the specified index
   */
  get(idx) {
    if (idx < 0) throw new RangeError('DoublyLinkedList: index ' + idx + ' is out of bounds '
      + 'length is ' + this.length + '.');
    if (idx >= this.length) throw new RangeError('DoublyLinkedList: index ' + idx + ' is out of bounds '
      + 'length is ' + this.length + '.');
    let cur = this.first;
    for (let i=0; i<this.length; i++) {
      if (i == idx) {
        return cur.data;
      }
      cur = cur.next;
    }
  }

  /**
   * Remove an element at a specific index
   * @param {number} idx the index
   */
  removeIdx(idx) {
    if (idx < 0) throw new RangeError('DoublyLinkedList: index ' + idx + ' is out of bounds '
      + 'length is ' + this.length + '.');
    if (idx >= this.length) throw new RangeError('DoublyLinkedList: index ' + idx + ' is out of bounds '
      + 'length is ' + this.length + '.');
    if (idx == 0) {
      this.first = this.first.next;
      if (this.first !== null) this.first.last = null;
    } else {
      let last = this.first;
      let cur = this.first.next;
      for (let i=1; i<this.length; i++) {
        if (i == idx) {
          last.next = cur.next;
          if (cur.next !== null) cur.next.last = last;
          else this.last = last;
          break;
        }
        last = cur;
        cur = cur.next;
      }
    }
    this.length--;
  }

  /**
   * Remove a specific element
   * @param {any} obj the element
   * @return {boolean} true if the element was contained in this list
   */
  removeObj(obj) {
    let found = false;
    if (obj === this.first.data) {
      this.first = this.first.next;
      if (this.first !== null) this.first.last = null;
      found = true;
    } else {
      let last = this.first;
      let cur = this.first.next;
      for (let i=1; i<this.length; i++) {
        if (obj === cur.data) {
          last.next = cur.next;
          if (cur.next !== null) cur.next.last = last;
          else this.last = last;
          found = true;
          break;
        }
        last = cur;
        cur = cur.next;
      }
    }
    if (found) this.length--;
    return found;
  }

  /**
   * Remove a specific element from this list
   * @param {DoubleLink} lnk the element to remove (its wrapper)
   */
  removeLink(lnk) {
    if (this.length == 0) throw new RangeError('DoublyLinkedList: cannot remove element from empty list.');
    if (lnk.last == null && lnk.next == null) {
      if (this.first != lnk || this.length != 1)
        throw new Error('DoublyLinkedList: cannot remove link that is not part of the list');
      this.first = this.last = null;
    } else if (lnk.last == null) {
      if (this.first != lnk)
        throw new Error('DoublyLinkedList: cannot remove link that is not part of the list');
      this.first = lnk.next;
      lnk.next.last = null;
    } else if (lnk.next == null) {
      if (this.last != lnk)
        throw new Error('DoublyLinkedList: cannot remove link that is not part of the list');
      this.last = lnk.last;
      lnk.last.next = null;
    } else {
      const ne = lnk.next, la = lnk.last;
      ne.last = la; la.next = ne;
    }
    this.length--;
  }

  /**
   * Add an element after a specific element
   * @param {DoubleLink} lnk the element after which to add the new element
   * @param {any} obj the element to add
   * @return {DoubleLink} the added element's wrapper
   */
  insertAfter(lnk, obj) {
    const ne = lnk.next;
    if (ne == null) {
      if (this.last != lnk)
        throw new Error('DoublyLinkedList: cannot add element after link that is not part of the list');
      return this.pushBack(obj);
    }
    const ret = lnk.next = ne.last = new DoubleLink(obj, lnk, ne);
    this.length++;
    return ret;
  }

  /**
   * Add an element before a specific element
   * @param {DoubleLink} lnk the element before which to add the new element
   * @param {any} obj the element to add
   * @return {DoubleLink} the added element's wrapper
   */
  insertBefore(lnk, obj) {
    const la = lnk.last;
    if (la == null) {
      if (this.first != lnk)
        throw new Error('DoublyLinkedList: cannot add element before link that is not part of the list');
      return this.pushFront(obj);
    }
    const ret = lnk.last = la.next = new DoubleLink(obj, la, lnk);
    this.length++;
    return ret;
  }

  /**
   * Add an element after a specific element
   * @param {DoubleLink} lnk the element after which to add the new element
   * @param {DoubleLink} obj the wrapper of the element to add
   * @return {DoubleLink} the added element's wrapper
   */
  insertLinkAfter(lnk, obj) {
    const ne = lnk.next;
    if (ne == null) {
      if (this.last != lnk)
        throw new Error('DoublyLinkedList: cannot add element after link that is not part of the list');
      this.last = obj; this.last.next = null; this.last.last = lnk; lnk.next = this.last;
      this.length++;
      return obj;
    }
    const ret = lnk.next = ne.last = obj;
    obj.last = lnk; obj.next = ne;
    this.length++;
    return ret;
  }

  /**
   * Add an element before a specific element
   * @param {DoubleLink} lnk the element before which to add the new element
   * @param {DoubleLink} obj the wrapper of the element to add
   * @return {DoubleLink} the added element's wrapper
   */
  insertLinkBefore(lnk, obj) {
    const la = lnk.last;
    if (la == null) {
      if (this.first != lnk)
        throw new Error('DoublyLinkedList: cannot add element before link that is not part of the list');
      this.first = obj; this.first.last = null; this.first.next = lnk; lnk.last = this.first;
      this.length++;
      return obj;
    }
    const ret = lnk.last = la.next = obj;
    obj.last = la; obj.next = lnk;
    this.length++;
    return ret;
  }

  /**
   * Check whether an element is contained in this list
   * @param {any} obj the element
   * @return {boolean} true if the element is contained in this list
   */
  contains(obj) {
    let cur = this.first;
    for (let i=0; i<this.length; i++) {
      if (obj === cur.data) {
        return true;
      }
      cur = cur.next;
    }
    return false;
  }

  /**
   * Add an element to the end of this list
   * @param {any} obj the element to add
   * @return {DoubleLink} the element's wrapper
   */
  pushBack(obj) {
    let ret;
    if (this.length == 0) {
      ret = this.last = this.first = new DoubleLink(obj, null, null);
    } else {
      ret = this.last.next = new DoubleLink(obj, this.last, null);
      this.last = this.last.next;
    }
    this.length++;
    return ret;
  }

  /**
   * Get the last element of this list
   * @return {any} the last element
   */
  getBack() {
    if (this.length == 0) throw new RangeError('DoublyLinkedList: cannot get last element from empty list.');
    return this.last.data;
  }

  /**
   * Get and remove the last element of this list
   * @return {any} the last element
   */
  popBack() {
    if (this.length == 0) throw new RangeError('DoublyLinkedList: cannot pop last element from empty list.');
    const ret = this.last.data;
    this.last = this.last.last;
    if (this.last !== null) this.last.next = null;
    else this.first = null;
    this.length--;
    return ret;
  }

  /**
   * Add an element to the beginning of this list
   * @param {any} obj the element to add
   * @return {DoubleLink} the element's wrapper
   */
  pushFront(obj) {
    let ret;
    if (this.length == 0) {
      ret = this.last = this.first = new DoubleLink(obj, null, null);
    } else {
      ret = this.first.last = new DoubleLink(obj, null, this.first);
      this.first = this.first.last;
    }
    this.length++;
    return ret;
  }

  /**
   * Get the first element of this list
   * @return {any} the first element
   */
  getFront() {
    if (this.length == 0) throw new RangeError('DoublyLinkedList: cannot get first element from empty list.');
    return this.first.data;
  }

  /**
   * Get and remove the first element of this list
   * @return {any} the first element
   */
  popFront() {
    if (this.length == 0) throw new RangeError('DoublyLinkedList: cannot pop first element from empty list.');
    const ret = this.first.data;
    this.first = this.first.next;
    if (this.first !== null) this.first.last = null;
    else this.last = null;
    this.length--;
    return ret;
  }

  /**
   * Converts this list into an array
   * @return {any[]} the array with the list elements
   */
  toArray() {
    const ret = [];
    let cur = this.first;
    for (let i=0; i<this.length; i++) {
      ret.push(cur.data);
      cur = cur.next;
    }
    return ret;
  }

  /**
   * Returns whether or not this list is empty
   * @return {boolean} true if the list is empty
   */
  isEmpty() {
    return this.length == 0;
  }

  /**
   * Converts this list into a string
   * @return {string} the string representation
   */
  toString() {
    let ret = "DoublyLinkedList: [";
    let cur = this.first;
    for (let i=0; i<this.length; i++) {
      if (i > 0) ret += ", ";
      ret += cur.data;
      cur = cur.next;
    }
    ret += "]";
    return ret;
  }
}
