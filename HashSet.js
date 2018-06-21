
/**
 * A hash set
 */
class HashSet {
  /**
   * Create a new hash set
   * @param {Function} toKeyFct how to map elements to hashes
   */
	constructor(toKeyFct = a => a) {
    this._toKeyFct = toKeyFct;
    this._hashMap = {};
    /**
     * the number of elements in this hash set
     * @type {number}
     */
    this.length = 0;
	}

	/**
	 * Insert a new key / element into this hash set
	 * @param {any} key the key / element to be inserted
	 */
	insert(key) {
    if (!this._hashMap.hasOwnProperty(this._toKeyFct(key))) {
      this._hashMap[this._toKeyFct(key)] = key;
      this.length++;
    }
	}

	/**
	 * Remove a key / element from this hash set
	 * @param {any} key the key / element to be removed
	 */
  remove(key) {
    if (this._hashMap.hasOwnProperty(this._toKeyFct(key))) {
      this._hashMap[this._toKeyFct(key)] = undefined;
      delete this._hashMap[this._toKeyFct(key)];
      this.length--;
    }
  }

	/**
	 * Search for a key / element in this hash set
	 * @param {any} key the key / element to search for
	 * @return {boolean} true if the key / element was found
	 */
	find(key) {
		return this._hashMap.hasOwnProperty(this._toKeyFct(key));
	}

  /**
	 * Check whether a key / element is contained in this hash set
	 * @param {any} key the key / element to search for
	 * @return {boolean} true if the key / element was found
	 */
  contains(key) {
    return this.find(key);
  }

  /**
   * Converts this hash set into an array
   * @return {any[]} the array with the tree elements
   */
  toArray() {
    const ret = [];
    for (const prop in this._hashMap) {
      if (this._hashMap.hasOwnProperty(prop)) {
        ret.push(this._hashMap[prop]);
      }
    }
    return ret;
  }

  /**
   * Returns whether or not this hash set is empty
   * @return {boolean} true if the hash set is empty
   */
  isEmpty() {
    return this.length == 0;
  }
}

/**
 * A hash set using a doubly linked list to save the elements
 */
class ListHashSet {
  /**
   * Create a new hash set
   * @param {Function} toKeyFct how to map elements to hashes
   */
	constructor(toKeyFct = a => a) {
    this._toKeyFct = toKeyFct;
    this._hashMap = {};
    /**
     * The list containing all the elements in this set
     * @type {DoublyLinkedList}
     */
    this.list = new DoublyLinkedList();
	}

  /**
   * the number of elements in this hash set
   * @type {number}
   */
  get length() {
    return this.list.length;
  }

	/**
	 * Insert a new key / element into this hash set
	 * @param {any} key the key / element to be inserted
	 */
	insert(key) {
    if (typeof this._hashMap[this._toKeyFct(key)] === 'undefined') {
      this._hashMap[this._toKeyFct(key)] = this.list.pushBack(key);
    }
	}

	/**
	 * Remove a key / element from this hash set
	 * @param {any} key the key / element to be removed
	 */
  remove(key) {
    if (typeof this._hashMap[this._toKeyFct(key)] !== 'undefined') {
      this.list.removeLink(this._hashMap[this._toKeyFct(key)]);
      this._hashMap[this._toKeyFct(key)] = undefined;
    }
  }

	/**
	 * Search for a key / element in this hash set
	 * @param {any} key the key / element to search for
	 * @return {boolean} true if the key / element was found
	 */
	find(key) {
		return (typeof this._hashMap[this._toKeyFct(key)] !== 'undefined');
	}

  /**
	 * Check whether a key / element is contained in this hash set
	 * @param {any} key the key / element to search for
	 * @return {boolean} true if the key / element was found
	 */
  contains(key) {
    return this.find(key);
  }

  /**
   * Converts this hash set into an array
   * @return {any[]} the array with the tree elements
   */
  toArray() {
    return this.list.toArray();
  }

  /**
   * Returns whether or not this hash set is empty
   * @return {boolean} true if the hash set is empty
   */
  isEmpty() {
    return this.length == 0;
  }
}
