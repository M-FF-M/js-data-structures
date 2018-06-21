
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
    this._data = elems.slice();
    this._front = 0;
    this._last = elems.length - 1;
    this._size = 16;
    if (elems.length > 0) {
      this._size = Math.max(16, 1 << Math.ceil( Math.log2(elems.length) ));
    } else {
      this._front = 1;
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
    return this._data[(this._front + idx) % this._size];
  }

  /**
   * Check whether an element is contained in this queue
   * @param {any} obj the element
   * @return {boolean} true if the element is contained in this queue
   */
  contains(obj) {
    for (let i=0; i<this.length; i++) {
      if (this._data[(this._front + i) % this._size] === obj)
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
      if (this._data[(this._front + i) % this._size] === obj) {
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
      this._data[i % this._size] = this._data[(i + 1) % this._size];
    }
    --this._last;
    if (this._last < 0) this._last = this._size - 1;
    this._checkFrontShift();
  }

  /**
   * the number of elements in this queue
   * @type {number}
   */
  get length() {
    if (this._last < 0) return 0;
    if (this._last >= this._front) return this._last - this._front + 1;
    return this._size - this._front + this._last + 1;
  }

  _checkFrontShift() {
    if (this.length < this._size / 4) {
      let tmpData = [];
      for (let i=0; i<this.length; i++) {
        tmpData[i] = this._data[(this._front + i) % this._size];
      }
      this._data = tmpData;
      this._front = 0;
      this._last = this._data.length - 1;
      this._size = Math.max(16, 1 << Math.ceil( Math.log2(this._data.length) ), this._size / 2);
    }
  }

  /**
   * Add an element to the end of this queue
   * @param {any} obj the element to add
   */
  pushBack(obj) {
    if (this.length == 0) {
      this._data.push(obj);
      this._front = this._last = 0;
    } else {
      if (this._last >= this._front) {
        this._data[++this._last] = obj;
        if (this._last >= this._size) this._size *= 2;
      } else {
        if (this._last < this._front - 1) {
          this._data[++this._last] = obj;
        } else {
          for (let i=0; i<this._size-this._front; i++) {
            this._data[this._front + this._size + i] = this._data[this._front + i];
          }
          this._front += this._size;
          this._size *= 2;
          this._data[++this._last] = obj;
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
    return this._data[this._last];
  }

  /**
   * Get and remove the last element of this queue
   * @return {any} the last element
   */
  popBack() {
    if (this.length == 0) throw new RangeError('Queue: cannot pop last element from empty queue.');
    const ret = this._data[this._last];
    if (this.length == 1) {
      this._data = [];
      this._front = 1;
      this._last = -1;
      this._size = 16;
      return ret;
    }
    --this._last;
    if (this._last < 0) this._last = this._size - 1;
    this._checkFrontShift();
    return ret;
  }

  /**
   * Add an element to the beginning of this queue
   * @param {any} obj the element to add
   */
  pushFront(obj) {
    if (this.length == 0) {
      this._data.push(obj);
      this._front = this._last = 0;
    } else {
      if (this._last >= this._front) {
        if (this._front > 0) {
          this._data[--this._front] = obj;
        } else {
          if (this._last == this._size - 1) this._size *= 2;
          this._front = this._size - 1;
          this._data[this._front] = obj;
        }
      } else {
        if (this._last < this._front - 1) {
          this._data[--this._front] = obj;
        } else {
          for (let i=0; i<this._size-this._front; i++) {
            this._data[this._front + this._size + i] = this._data[this._front + i];
          }
          this._front += this._size;
          this._size *= 2;
          this._data[--this._front] = obj;
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
    return this._data[this._front];
  }

  /**
   * Get and remove the first element of this queue
   * @return {any} the first element
   */
  popFront() {
    if (this.length == 0) throw new RangeError('Queue: cannot pop first element from empty queue.');
    const ret = this._data[this._front];
    if (this.length == 1) {
      this._data = [];
      this._front = 1;
      this._last = -1;
      this._size = 16;
      return ret;
    }
    ++this._front;
    if (this._front >= this._size) this._front = 0;
    this._checkFrontShift();
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
      ret += this._data[(this._front + i) % this._size];
    }
    ret += "]";
    return ret;
  }
}
