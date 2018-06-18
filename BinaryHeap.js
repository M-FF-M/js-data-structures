
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
    this.data = [];
    /**
     * @type {number} the number of elements in this heap
     */
    this.length = 0;
    if (elems.length > 0) {
      if (elems[0] instanceof Array) elems = elems[0];
      this.data = elems.slice();
      this.length = this.data.length;
      for (let i=Math.floor(this.length / 2) - 1; i>=0; i--) this.siftDown(i);
    }
  }

  swap(i, j) {
    let tmp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = tmp;
  }

  siftUp(i) {
    while (i > 0 && this.data[Math.floor((i - 1) / 2)] > this.data[i]) {
      this.swap(i, Math.floor((i - 1) / 2));
      i = Math.floor((i - 1) / 2);
    }
  }

  siftDown(i) {
    let m;
    while (2*i + 1 < this.length) {
      if (2*i + 2 >= this.length)
        m = 2*i + 1;
      else {
        if (this.data[2*i + 1] < this.data[2*i + 2]) m = 2*i + 1;
        else m = 2*i + 2;
      }
      if (this.data[i] <= this.data[m]) return;
      this.swap(i, m); i = m;
    }
  }

  /**
   * Get the minimum element in this heap
   * @return {any} the minimum element
   */
  min() {
		if (this.length == 0) throw new RangeError('BinaryHeap: can\'t call min() on an empty heap.');
    return this.data[0];
  }

  /**
   * Get and delete the minimum element in this heap
   * @return {any} the minimum element
   */
  deleteMin() {
    let ret = this.data[0];
    this.length--;
    this.data[0] = this.data[this.length]; this.data.pop();
    this.siftDown(0);
    return ret;
  }

  /**
   * Insert a new element / key into this heap
   * @param {any} key the new element / key
   */
  insert(key) {
    this.data[this.length] = key;
    this.siftUp(this.length);
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
   * @param {Function} cmpFct the comparison function
   * @param {any[]} [elems] the elements to insert into this heap
   */
  constructor(cmpFct, ...elems) {
    this.data = [];
    this.cmpFct = cmpFct;
    /**
     * @type {number} the number of elements in this heap
     */
    this.length = 0;
    if (elems.length > 0) {
      if (elems[0] instanceof Array) elems = elems[0];
      this.data = elems.slice();
      this.length = this.data.length;
      for (let i=Math.floor(this.length / 2) - 1; i>=0; i--) this.siftDown(i);
    }
  }

  swap(i, j) {
    let tmp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = tmp;
  }

  siftUp(i) {
    while (i > 0 && this.cmpFct(this.data[Math.floor((i - 1) / 2)], this.data[i]) > 0) {
      this.swap(i, Math.floor((i - 1) / 2));
      i = Math.floor((i - 1) / 2);
    }
  }

  siftDown(i) {
    let m;
    while (2*i + 1 < this.length) {
      if (2*i + 2 >= this.length)
        m = 2*i + 1;
      else {
        if (this.cmpFct(this.data[2*i + 1], this.data[2*i + 2]) < 0) m = 2*i + 1;
        else m = 2*i + 2;
      }
      if (this.cmpFct(this.data[i], this.data[m]) <= 0) return;
      this.swap(i, m); i = m;
    }
  }

  /**
   * Get the minimum element (as specified by the custom comparison function) in this heap
   * @return {any} the minimum element
   */
  min() {
		if (this.length == 0) throw new RangeError('BinaryHeap: can\'t call min() on an empty heap.');
    return this.data[0];
  }

  /**
   * Get and delete the minimum element (as specified by the custom comparison function) in this heap
   * @return {any} the minimum element
   */
  deleteMin() {
    let ret = this.data[0];
    this.length--;
    this.data[0] = this.data[this.length]; this.data.pop();
    this.siftDown(0);
    return ret;
  }

  /**
   * Insert a new element / key into this heap
   * @param {any} key the new element / key
   */
  insert(key) {
    this.data[this.length] = key;
    this.siftUp(this.length);
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

const PriorityQueue = BinaryHeap;
const CustomPriorityQueue = CustomBinaryHeap;
