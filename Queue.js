
/**
 * A (double-ended) queue
 */
class Queue {
  /**
   * Constructs a new linked queue
   * @param {any[]} [elems] the elements to insert into this queue
   */
  constructor(...elems) {
    if (elems.length == 1 && (elems[0] instanceof Array)) {
      elems = elems[0];
    }
    this.data = elems.slice();
    this.front = 0;
    this.last = elems.length - 1;
    this.size = 16;
    if (elems.length > 0) {
      this.size = Math.max(16, 1 << Math.ceil( Math.log2(elems.length) ));
    } else {
      this.front = 1;
    }
  }

  /**
   * Get an element at a specific index
   * @param {number} idx the index
   * @return {any} the element at the specified index
   */
  get(idx) {
    if (idx < 0) throw new RangeError('Queue: index ' + idx + ' is out of bounds '
      + 'length is ' + this.length + '.');
    if (idx >= this.length) throw new RangeError('Queue: index ' + idx + ' is out of bounds '
      + 'length is ' + this.length + '.');
    return this.data[(this.front + idx) % this.size];
  }

  /**
   * Check whether an element is contained in this queue
   * @param {any} obj the element
   * @return {boolean} true if the element is contained in this queue
   */
  contains(obj) {
    for (let i=0; i<this.length; i++) {
      if (this.data[(this.front + i) % this.size] === obj)
        return true;
    }
    return false;
  }

  /**
   * Remove a specific element
   * @param {any} obj the element
   * @return {boolean} true if the element was contained in this queue
   */
  removeObj(obj) {
    let idx = -1;
    for (let i=0; i<this.length; i++) {
      if (this.data[(this.front + i) % this.size] === obj) {
        idx = i;
        break;
      }
    }
    if (idx == -1) return false;
    this.removeIdx(idx);
    return true;
  }

  /**
   * Remove an element at a specific index
   * @param {number} idx the index
   */
  removeIdx(idx) {
    if (idx < 0) throw new RangeError('Queue: index ' + idx + ' is out of bounds '
      + 'length is ' + this.length + '.');
    if (idx >= this.length) throw new RangeError('Queue: index ' + idx + ' is out of bounds '
      + 'length is ' + this.length + '.');
    for (let i=idx; i<this.length; i++) {
      this.data[i % this.size] = this.data[(i + 1) % this.size];
    }
    --this.last;
    if (this.last < 0) this.last = this.size - 1;
    this.checkFrontShift();
  }

  /**
   * @type {number} the number of elements in this heap
   */
  get length() {
    if (this.last < 0) return 0;
    if (this.last >= this.front) return this.last - this.front + 1;
    return this.size - this.front + this.last + 1;
  }

  checkFrontShift() {
    if (this.length < this.size / 4) {
      let tmpData = [];
      for (let i=0; i<this.length; i++) {
        tmpData[i] = this.data[(this.front + i) % this.size];
      }
      this.data = tmpData;
      this.front = 0;
      this.last = this.data.length - 1;
      this.size = Math.max(16, 1 << Math.ceil( Math.log2(this.data.length) ), this.size / 2);
    }
  }

  /**
   * Add an element to the end of this queue
   * @param {any} obj the element to add
   */
  pushBack(obj) {
    if (this.length == 0) {
      this.data.push(obj);
      this.front = this.last = 0;
    } else {
      if (this.last >= this.front) {
        this.data[++this.last] = obj;
        if (this.last >= this.size) this.size *= 2;
      } else {
        if (this.last < this.front - 1) {
          this.data[++this.last] = obj;
        } else {
          for (let i=0; i<this.size-this.front; i++) {
            this.data[this.front + this.size + i] = this.data[this.front + i];
          }
          this.front += this.size;
          this.size *= 2;
          this.data[++this.last] = obj;
        }
      }
    }
  }

  /**
   * Get the last element of this queue
   * @return {any} the last element
   */
  getBack() {
    if (this.length == 0) throw new RangeError('Queue: cannot get last element from empty queue.');
    return this.data[this.last];
  }

  /**
   * Get and remove the last element of this queue
   * @return {any} the last element
   */
  popBack() {
    if (this.length == 0) throw new RangeError('Queue: cannot pop last element from empty queue.');
    const ret = this.data[this.last];
    if (this.length == 1) {
      this.data = [];
      this.front = 1;
      this.last = -1;
      this.size = 16;
      return ret;
    }
    --this.last;
    if (this.last < 0) this.last = this.size - 1;
    this.checkFrontShift();
    return ret;
  }

  /**
   * Add an element to the beginning of this queue
   * @param {any} obj the element to add
   */
  pushFront(obj) {
    if (this.length == 0) {
      this.data.push(obj);
      this.front = this.last = 0;
    } else {
      if (this.last >= this.front) {
        if (this.front > 0) {
          this.data[--this.front] = obj;
        } else {
          if (this.last == this.size - 1) this.size *= 2;
          this.front = this.size - 1;
          this.data[this.front] = obj;
        }
      } else {
        if (this.last < this.front - 1) {
          this.data[--this.front] = obj;
        } else {
          for (let i=0; i<this.size-this.front; i++) {
            this.data[this.front + this.size + i] = this.data[this.front + i];
          }
          this.front += this.size;
          this.size *= 2;
          this.data[--this.front] = obj;
        }
      }
    }
  }

  /**
   * Get the first element of this queue
   * @return {any} the first element
   */
  getFront() {
    if (this.length == 0) throw new RangeError('Queue: cannot get last element from empty queue.');
    return this.data[this.front];
  }

  /**
   * Get and remove the first element of this queue
   * @return {any} the first element
   */
  popFront() {
    if (this.length == 0) throw new RangeError('Queue: cannot pop first element from empty queue.');
    const ret = this.data[this.front];
    if (this.length == 1) {
      this.data = [];
      this.front = 1;
      this.last = -1;
      this.size = 16;
      return ret;
    }
    ++this.front;
    if (this.front >= this.size) this.front = 0;
    this.checkFrontShift();
    return ret;
  }

  /**
   * Returns whether or not this queue is empty
   * @return {boolean} true if the queue is empty
   */
  isEmpty() {
    return this.length == 0;
  }

  /**
   * Converts this queue into a string
   * @return {string} the string representation
   */
  toString() {
    let ret = "Queue: [";
    for (let i=0; i<this.length; i++) {
      if (i > 0) ret += ", ";
      ret += this.data[(this.front + i) % this.size];
    }
    ret += "]";
    return ret;
  }
}
