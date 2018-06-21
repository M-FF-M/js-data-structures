
/**
 * A simple edge with one destination node (source node must be inferred from the adjacency list)
 */
class E {
  /**
   * Construct a new simple edge
   * @param {number} v the destination node
   */
  constructor(v) {
    /**
     * the destination node of this edge
     * @type {number}
     */
    this.v = v;
  }
}

/**
 * A weighted edge with one destination node (source node must be inferred from the adjacency list)
 */
class WE {
  /**
   * Construct a new weighted edge
   * @param {number} v the destination node
   * @param {number} w the weight
   */
  constructor(v, w) {
    /**
     * the destination node of this edge
     * @type {number}
     */
    this.v = v;
    /**
     * the weight of this edge
     * @type {number}
     */
    this.w = w;
  }
}

/**
 * A directed graph (an undirected graph can be represented by two directed edges for every undirected
 * edge)
 */
class Graph {
  /**
   * Create a new graph
   * @param {number} n the number of nodes
   */
  constructor(n) {
    /**
     * the number of nodes in this graph
     * @type {number}
     */
    this.n = n;
    this._weighted = false;
    /**
     * the adjacency list of this graph
     * @type {E[][]|WE[][]}
     */
    this.adjList = [];
    /**
     * the reverse adjacency list of this graph
     * @type {E[][]|WE[][]}
     */
    this.adjListRev = [];
    this._nodeMap = new Map();
    for (let i=0; i<this.n; i++) {
      this.adjList[i] = [];
      this.adjListRev[i] = [];
    }
  }

  /**
   * Converts this graph into a graph with the strongly connected components of this graph as nodes.
   * The nodes of the new graph will be associated with an array containing the nodes that were part
   * of the strongly connected component in the original graph.
   * @return {Graph} the new (acyclic) graph
   */
  getSCCGraph() {
    const dfs_low = [], dfs_num = [], visited = [], UNVISITED = -1, EXPLORED = 0, VISITED = 1,
      inSCC = [];
    let dfsNumberCounter = 0;
    for (let i=0; i<this.n; i++) {
      dfs_low[i] = UNVISITED; dfs_num[i] = UNVISITED; visited[i] = UNVISITED;
      inSCC[i] = -1;
    }
    const s = new Queue();
    const cEdgesQ = new Queue();
    const nNodes = [];
    const nEdges = [];

    const tarjanSCC = u => {
      const cEdges = new Set();
      dfs_low[u] = dfs_num[u] = dfsNumberCounter++;
      s.pushBack(u); cEdgesQ.pushBack(cEdges);
      visited[u] = EXPLORED;
      for (let j=0; j<this.adjList[u].length; j++) {
        const v = this.adjList[u][j].v;
        if (dfs_num[v] == UNVISITED) {
          const conTo = tarjanSCC(v);
          if (conTo != -1) cEdges.add(conTo);
        } else {
          if (inSCC[v] != -1) cEdges.add(inSCC[v]);
        }
        if (visited[v] == EXPLORED)
          dfs_low[u] = Math.min(dfs_low[u], dfs_low[v]);
      }
      if (dfs_low[u] == dfs_num[u]) {
        const scc = [];
        while (true) {
          const v = s.popBack(); visited[v] = VISITED; inSCC[v] = nNodes.length;
          scc.push(this.getNode(v));
          const eSet = cEdgesQ.popBack();
          if (u == v) break;
          for (const eTo of eSet) cEdges.add(eTo);
        }
        nNodes.push(scc);
        for (const eTo of cEdges) nEdges.push([nNodes.length - 1, eTo]);
        return nNodes.length - 1;
      }
      return -1;
    };
    
    for (let i=0; i<this.n; i++)
      if (dfs_num[i] == UNVISITED)
        tarjanSCC(i);

    const ret = new Graph(nNodes.length);
    for (let i=0; i<nEdges.length; i++) ret.insertEdge(nEdges[i][0], nEdges[i][1]);
    for (let i=0; i<nNodes.length; i++) ret.setNode(i, nNodes[i]);

    return ret;
  }

  /**
   * Get a topological sort of this graph's nodes
   * @return {any[]} an array with the nodes in topological order. If setNode() was used, this array
   * will contain the associated objects, otherwise it will contain the node's indices. The method
   * will return null if this is not an acyclic graph.
   */
  topSort() {
    const outgoing = []; let nodesProcessed = 0;
    const topS = [];
    const q = new Queue();
    for (let i=0; i<this.n; i++) {
      outgoing[i] = this.adjList[i].length;
      if (outgoing[i] == 0) {
        nodesProcessed++;
        q.pushBack(i);
        topS.push(this.getNode(i));
      }
    }
    while (!q.isEmpty()) {
      const u = q.popFront();
      for (let i=0; i<this.adjListRev[u].length; i++) {
        const v = this.adjListRev[u][i].v;
        outgoing[v]--;
        if (outgoing[v] == 0) {
          nodesProcessed++;
          q.pushBack(v);
          topS.push(this.getNode(v));
        }
      }
    }
    if (nodesProcessed == this.n) {
      return topS.reverse();
    } else {
      return null;
    }
  }

  /**
   * Check whether this graph is acyclic (only works for directed graphs)
   * @return {boolean} true if the graph is acyclic
   */
  isAcyclic() {
    return this.topSort() !== null;
  }

  /**
   * Insert a new edge into this graph (you should consistently use the weight or not use it, don't mix
   * weighted and unweighted edges)
   * @param {number} u the source node
   * @param {number} v the destination node
   * @param {number} [w] the weight of the edge
   */
  insertEdge(u, v, w) {
    if (typeof w === 'number') {
      this.adjList[u].push(new WE(v, w));
      this.adjListRev[v].push(new WE(u, w));
      this._weighted = true;
    } else {
      this.adjList[u].push(new E(v));
      this.adjListRev[v].push(new E(u));
    }
  }

  /**
   * Insert a new undirected edge into this graph (you should consistently use the weight or not use it,
   * don't mix weighted and unweighted edges)
   * @param {number} u the source node
   * @param {number} v the destination node
   * @param {number} [w] the weight of the edge
   */
  insertUndirectedEdge(u, v, w) {
    this.insertEdge(u, v, w);
    this.insertEdge(v, u, w);
  }

  /**
   * If a specific value for the given node was set, this value will be returned. Otherwise, this
   * method will return its only parameter.
   * @param {number} i the number of the node
   * @return {any} the node's value or i (see description above)
   */
  getNode(i) {
    if (this._nodeMap.has(i)) return this._nodeMap.get(i);
    return i;
  }

  /**
   * Associates a node with an object. This can be useful with some graph algorithms that will
   * return the associated objects instead of the node indices.
   * @param {number} i the number of the node
   * @param {any} obj the object the node should be associated with
   */
  setNode(i, obj) {
    this._nodeMap.set(i, obj);
  }

  /**
   * Get an array with all nodes in this graph
   * @return {any[]} the array with the nodes. If setNode() was used, this array will contain the
   * associated objects. Otherwise, it will contain the node's indices (that is, the array will simply
   * contain the numbers from 0 to n-1).
   */
  getAllNodes() {
    const ret = [];
    for (let i=0; i<this.n; i++) ret.push(this.getNode(i));
    return ret;
  }
}
