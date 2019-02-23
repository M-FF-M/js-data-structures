
function GraphTest() {
  // sample data
  const nodes = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n'];
  const edges = [
    ['a', 'b'], ['a', 'e'], ['b', 'c'], ['c', 'i'], ['d', 'f'], ['e', 'k'], ['f', 'g'],
    ['g', 'd'], ['g', 'e'], ['g', 'l'], ['h', 'g'], ['h', 'm'], ['h', 'n'], ['i', 'b'],
    ['i', 'h'], ['j', 'f'], ['k', 'j'], ['k', 'l'], ['l', 'm']
  ];
  const nodes2_num = 15;
  const edges2 = [
    [0, 10], [1, 6], [1, 13], [2, 12], [3, 2], [3, 9], [3, 11], [4, 3], [5, 6], [6, 0],
    [7, 0], [7, 1], [8, 13], [9, 4], [10, 14], [11, 7], [11, 8], [12, 3], [13, 5], [13, 11],
    [14, 6]
  ];
  const nodes3_num = 9;
  const edges3 = [
    [0, 2, 1], [0, 3, 5], [2, 1, 3], [2, 4, 1], [2, 5, 1], [3, 0, 2], [3, 2, 4], [4, 6, 1],
    [5, 7, 6], [6, 3, 1], [6, 7, 3], [7, 4, 2], [8, 7, 5]
  ];
  const g3dijkstra = [0, 4, 1, 4, 2, 2, 3, 6, Infinity];

  // --> Graph
  const g = new Graph(nodes.length);
  for (let i=0; i<nodes.length; i++) g.setNode(i, nodes[i]);
  for (let i=0; i<edges.length; i++)
    g.insertEdge(nodes.indexOf(edges[i][0]), nodes.indexOf(edges[i][1]));
  assertStrictEqual(g.n, nodes.length);
  for (let i=0; i<nodes.length; i++) assertStrictEqual(g.getNode(i), nodes[i]);
  assertStrictEqual(g.isAcyclic(), false);

  const g2 = g.getSCCGraph();
  assertStrictEqual(g2.n, 7);
  assertStrictEqual(g2.isAcyclic(), true);
  const topSort = g2.topSort();
  const allNodes = g2.getAllNodes();
  assertNotStrictEqual(topSort, null);
  assertStrictEqual(allNodes.length, g2.n);
  const expAllNodes = [['m'], ['l'], ['j', 'k', 'e', 'f', 'd', 'g'], ['n'], ['h'], ['i', 'c', 'b'], ['a']];
  const expTopSort = [['a'], ['i', 'c', 'b'], ['h'], ['j', 'k', 'e', 'f', 'd', 'g'], ['l'], ['n'], ['m']];
  for (let i=0; i<expAllNodes.length; i++)
    assertArrayCmp(expAllNodes[i].sort(), allNodes[i].sort(), assertStrictEqual);
  for (let i=0; i<expTopSort.length; i++)
    assertArrayCmp(expTopSort[i].sort(), topSort[i].sort(), assertStrictEqual);
  const adjListEntries = [[], [0], [1], [], [0, 2, 3], [4], [2, 5]];
  for (let i=0; i<7; i++) {
    assertStrictEqual(g2.adjList[i].length, adjListEntries[i].length);
    for (let k=0; k<g2.adjList[i].length; k++) {
      const v = g2.adjList[i][k].v; const idx = adjListEntries[i].indexOf(v);
      assertNotStrictEqual(idx, -1); adjListEntries[i][idx] = -1;
    }
  }

  const g3 = new Graph(nodes2_num);
  for (let i=0; i<edges2.length; i++)
    g3.insertEdge(edges2[i][0], edges2[i][1]);
  assertStrictEqual(g3.n, nodes2_num);
  for (let i=0; i<nodes2_num; i++) assertStrictEqual(g3.getNode(i), i);
  assertStrictEqual(g3.isAcyclic(), false);

  const g4 = g3.getSCCGraph();
  assertStrictEqual(g4.n, 4);
  assertStrictEqual(g4.isAcyclic(), true);
  const topSort2 = g4.topSort();
  assertNotStrictEqual(topSort2, null);
  const expTopSort2 = [[2, 3, 4, 9, 12], [1, 7, 8, 11, 13], [5], [0, 6, 10, 14]];
  for (let i=0; i<expTopSort2.length; i++)
    assertArrayCmp(expTopSort2[i].sort(), topSort2[i].sort(), assertStrictEqual);
  const adjListEntries2 = [[], [0], [0, 1], [2]];
  for (let i=0; i<4; i++) {
    assertStrictEqual(g4.adjList[i].length, adjListEntries2[i].length);
    for (let k=0; k<g4.adjList[i].length; k++) {
      const v = g4.adjList[i][k].v; const idx = adjListEntries2[i].indexOf(v);
      assertNotStrictEqual(idx, -1); adjListEntries2[i][idx] = -1;
    }
  }

  const g5 = new Graph(nodes3_num);
  for (let i=0; i<edges3.length; i++)
    g5.insertEdge(edges3[i][0], edges3[i][1], edges3[i][2]);
  const dijk = g5.dijkstra(0);
  assertArrayCmp(dijk, g3dijkstra, assertStrictEqual);
}
