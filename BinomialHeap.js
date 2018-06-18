
/**
 * A binomial min tree
 * 
 * Define your own sort order by implementing the valueOf method of a custom object
 */
class BinomialTreeNode {
  /**
   * Construct a new binomial tree with a single key / element (a tree of rank 1)
   * @param {any} key the key / element to insert into this tree
   */
	constructor(key) {
		this.key = key;
		this.children = [];
	}

  /**
   * Get the minimum element in this tree
   * @return {any} the minimum element
   */
	min() {
		return this.key;
	}

  /**
   * Get the rank of this tree
   * @return {number} the rank of this tree
   */
	rank() {
		return this.children.length;
	}

  /**
   * Delete the minimum element of this tree
   * @return {BinomialTreeNode[]} an array with all subtrees
   */
	deleteMin() {
    const retArr = this.children.slice();
    this.children = [];
		return retArr;
	}

  /**
   * Add a new child to this binomial tree (the child must have the same rank as this tree)
   * @param {BinomialTreeNode} child the new child
   * @return {BinomialTreeNode} this binomial tree (with the new child added)
   */
	addChild(child) {
    if (!(child instanceof BinomialTreeNode)) throw new Error('BinomialTreeNode: child must be of '
      + 'type BinomialTreeNode.');
    if (child.rank() != this.rank()) throw new Error('BinomialTreeNode: Can\'t add tree of rank ' + child.rank()
      + ' to a tree of rank ' + this.rank() + '.');
		this.children.push(child);
		return this;
	}
}

/**
 * Merge two binomial trees
 * @param {BinomialTreeNode} a the first tree
 * @param {BinomialTreeNode} b the second tree
 * @return {BinomialTreeNode} the merged tree
 */
function merge(a, b) {
  if (a.min() <= b.min())
    return a.addChild(b);
  else
    return b.addChild(a);
}

/**
 * A binomial min heap
 */
class BinomialHeap {
  /**
   * Constructs a new binomial min heap
   * @param {BinomialTreeNode[]|any} [elems] the element or BinomialTreeNodes to insert into this heap
   */
	constructor(...elems) {
    this.trees = [];
    /**
     * @type {number} the number of elements in this heap
     */
    this.length = 0;
    if (elems.length > 0) {
      if (elems[0] instanceof Array) elems = elems[0];
      if (elems.length == 1 && !(elems[0] instanceof BinomialTreeNode)) {
        this.trees.push(new BinomialTreeNode(elems[0]));
        this.length = 1;
      } else {
        for (let i=0; i<elems.length; i++) {
          this.trees.push(elems[i]);
          this.length += (1 << elems[i].rank());
        }
      }
    }
  }
  
  /**
   * Get the minimum element in this heap
   * @return {any} the minimum element
   */
	min() {
		if (this.trees.length == 0) throw new RangeError('BinomialHeap: can\'t call min() on an empty heap.');
		let min = Infinity;
		for (let i=0; i<this.trees.length; i++) {
			if (this.trees[i].min() < min) min = this.trees[i].min();
		}
		return min;
	}

  /**
   * Insert a new element / key into this heap
   * @param {any} key the new element / key
   */
	insert(key) {
		const secondHeap = new BinomialHeap(key);
    this.mergeWith(secondHeap);
	}

  /**
   * Get and delete the minimum element in this heap
   * @return {any} the minimum element
   */
	deleteMin() {
		if (this.trees.length == 0) throw new RangeError("Can't call deleteMin() on an empty heap.");
		let min = Infinity; let minTree = null; let minIdx = 0;
		for (let i=0; i<this.trees.length; i++) {
			if (this.trees[i].min() < min) {
				min = this.trees[i].min();
        minTree = this.trees[i];
        minIdx = i;
			}
		}
    const secondHeap = new BinomialHeap(minTree.deleteMin());
    this.length -= secondHeap.length + 1;
    this.trees.splice(minIdx, 1);
		this.mergeWith(secondHeap);
		return min;
	}

  /**
   * Merge this heap with another BinomialHeap
   * @param {BinomialHeap} heapB the second heap
   */
	mergeWith(heapB) {
		let idx_a = 0; let idx_b = 0;
    const newTrees = [];
		let lastRank = -1;
    this.length += heapB.length;
		while (idx_a < this.trees.length || idx_b < heapB.trees.length) {
			let a = null, b = null;
			let rank_a = Infinity, rank_b = Infinity;
			if (idx_a < this.trees.length) {
				a = this.trees[idx_a];
				rank_a = a.rank();
			}
			if (idx_b < heapB.trees.length) {
				b = heapB.trees[idx_b];
				rank_b = b.rank();
			}
			if (rank_a < rank_b) {
				idx_a++;
			} else if (rank_a > rank_b) {
				idx_b++;
				const tmp = rank_b; const tmpNode = b;
				rank_b = rank_a; b = a;
				rank_a = tmp; a = tmpNode;
			}
			let merged;
			if (rank_a == rank_b) {
				idx_a++;
				idx_b++;
				merged = merge(a, b);
			} else {
				merged = a;
			}
			if (merged.rank() > lastRank) {
				newTrees.push(merged);
				lastRank = merged.rank();
			} else {
				if (merged.rank() < lastRank) throw new Error('The developer obviously didn\'t understand'
					+ ' how binomial heaps work...');
				merged = merge(merged, newTrees[newTrees.length - 1]);
				newTrees[newTrees.length - 1] = merged;
				lastRank = merged.rank();
			}
		}
		this.trees = newTrees;
  }
  
  /**
   * Returns whether or not this heap is empty
   * @return {boolean} true if the heap is empty
   */
  isEmpty() {
    return this.trees.length == 0;
  }
}