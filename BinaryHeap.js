
/**
 * A binary min heap
 * 
 * Define your own sort order by implementing the valueOf method of a custom object
 */
class BinaryHeap {
  /**
   * Constructs a new binary min heap
   * @param {any[]} [elems] the elements to insert into this heap
   */
  constructor(...elems) {
    this._data = [];
    /**
     * the number of elements in this heap
     * @type {number}
     */
    this.length = 0;
    if (elems.length > 0) {
      if (elems[0] instanceof Array) elems = elems[0];
      this._data = elems.slice();
      this.length = this._data.length;
      for (let i=Math.floor(this.length / 2) - 1; i>=0; i--) this._siftDown(i);
    }
  }

  _swap(i, j) {
    let tmp = this._data[i];
    this._data[i] = this._data[j];
    this._data[j] = tmp;
  }

  _siftUp(i) {
    while (i > 0 && this._data[Math.floor((i - 1) / 2)] > this._data[i]) {
      this._swap(i, Math.floor((i - 1) / 2));
      i = Math.floor((i - 1) / 2);
    }
  }

  _siftDown(i) {
    let m;
    while (2*i + 1 < this.length) {
      if (2*i + 2 >= this.length)
        m = 2*i + 1;
      else {
        if (this._data[2*i + 1] < this._data[2*i + 2]) m = 2*i + 1;
        else m = 2*i + 2;
      }
      if (this._data[i] <= this._data[m]) return;
      this._swap(i, m); i = m;
    }
  }

  /**
   * Get the minimum element in this heap
   * @return {any} the minimum element
   */
  min() {
		if (this.length == 0) throw new RangeError('BinaryHeap: can\'t call min() on an empty heap.');
    return this._data[0];
  }

  /**
   * Get and delete the minimum element in this heap
   * @return {any} the minimum element
   */
  deleteMin() {
    let ret = this._data[0];
    this.length--;
    this._data[0] = this._data[this.length]; this._data.pop();
    this._siftDown(0);
    return ret;
  }

  /**
   * Insert a new element / key into this heap
   * @param {any} key the new element / key
   */
  insert(key) {
    this._data[this.length] = key;
    this._siftUp(this.length);
    this.length++;
  }

  /**
   * Returns whether or not this heap is empty
   * @return {boolean} true if the heap is empty
   */
  isEmpty() {
    return this.length == 0;
  }
}

/**
 * A binary heap with a custom comparison function
 */
class CustomBinaryHeap {
  /**
   * Constructs a new custom binary heap
   * @param {Function} [cmpFct] the comparison function
   * @param {any[]} [elems] the elements to insert into this heap
   */
  constructor(cmpFct = (a, b) => a - b, ...elems) {
    this._data = [];
    this.cmpFct = cmpFct;
    /**
     * the number of elements in this heap
     * @type {number}
     */
    this.length = 0;
    if (elems.length > 0) {
      if (elems[0] instanceof Array) elems = elems[0];
      this._data = elems.slice();
      this.length = this._data.length;
      for (let i=Math.floor(this.length / 2) - 1; i>=0; i--) this._siftDown(i);
    }
  }

  _swap(i, j) {
    let tmp = this._data[i];
    this._data[i] = this._data[j];
    this._data[j] = tmp;
  }

  _siftUp(i) {
    while (i > 0 && this.cmpFct(this._data[Math.floor((i - 1) / 2)], this._data[i]) > 0) {
      this._swap(i, Math.floor((i - 1) / 2));
      i = Math.floor((i - 1) / 2);
    }
  }

  _siftDown(i) {
    let m;
    while (2*i + 1 < this.length) {
      if (2*i + 2 >= this.length)
        m = 2*i + 1;
      else {
        if (this.cmpFct(this._data[2*i + 1], this._data[2*i + 2]) < 0) m = 2*i + 1;
        else m = 2*i + 2;
      }
      if (this.cmpFct(this._data[i], this._data[m]) <= 0) return;
      this._swap(i, m); i = m;
    }
  }

  /**
   * Get the minimum element (as specified by the custom comparison function) in this heap
   * @return {any} the minimum element
   */
  min() {
		if (this.length == 0) throw new RangeError('BinaryHeap: can\'t call min() on an empty heap.');
    return this._data[0];
  }

  /**
   * Get and delete the minimum element (as specified by the custom comparison function) in this heap
   * @return {any} the minimum element
   */
  deleteMin() {
    let ret = this._data[0];
    this.length--;
    this._data[0] = this._data[this.length]; this._data.pop();
    this._siftDown(0);
    return ret;
  }

  /**
   * Insert a new element / key into this heap
   * @param {any} key the new element / key
   */
  insert(key) {
    this._data[this.length] = key;
    this._siftUp(this.length);
    this.length++;
  }

  /**
   * Returns whether or not this heap is empty
   * @return {boolean} true if the heap is empty
   */
  isEmpty() {
    return this.length == 0;
  }
}

/**
 * A priority queue
 */
class PriorityQueue extends CustomBinaryHeap {
  /**
   * Constructs a new priority queue
   * @param {Function} [cmpFct] the comparison function
   * @param {any[]} [elems] the elements to insert into this priority queue
   */
  constructor(cmpFct = (a, b) => a - b, ...elems) {
    super(cmpFct, ...elems);
  }
}
