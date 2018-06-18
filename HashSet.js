
/**
 * A hash set
 */
class HashSet {
  /**
   * Create a new hash set
   * @param {Function} toKeyFct how to map elements to hashes
   */
	constructor(toKeyFct = a => a) {
    this.toKeyFct = toKeyFct;
    this.hashMap = {};
    this.list = new DoublyLinkedList();
	}

  /**
   * @type {number} the number of elements in this hash set
   */
  get length() {
    return this.list.length;
  }

	/**
	 * Insert a new key / element into this hash set
	 * @param {any} key the key / element to be inserted
	 */
	insert(key) {
    if (typeof this.hashMap[this.toKeyFct(key)] === 'undefined') {
      this.hashMap[this.toKeyFct(key)] = this.list.pushBack(key);
    }
	}

	/**
	 * Remove a key / element from this hash set
	 * @param {any} key the key / element to be removed
	 */
  remove(key) {
    if (typeof this.hashMap[this.toKeyFct(key)] !== 'undefined') {
      this.list.removeLink(this.hashMap[this.toKeyFct(key)]);
      this.hashMap[this.toKeyFct(key)] = undefined;
    }
  }

	/**
	 * Search for a key / element in this hash set
	 * @param {any} key the key / element to search for
	 * @return {boolean} true if the key / element was found
	 */
	find(key) {
		return (typeof this.hashMap[this.toKeyFct(key)] !== 'undefined');
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
