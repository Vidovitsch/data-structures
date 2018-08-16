/**
 * A default implementation of a graph using adjecent lists.
 * Each vertex has a list containing its adjectent vertices.
 *
 * @constructor
 */
function Graph() {
  this.verticesObj = {};
  this.vertexCount = 0;
  this.edgeCount = 0;
}

const G = Graph.prototype;

/**
 * Adds a vertex to the graph.
 *
 * @param {Any} v vertex
 * @throws Illegal Argument error, unless the vertex doesn't exist in the graph
 */
G.addVertex = function addVertex(v) {
  if (this.verticesObj[v]) throw new Error('Illegal argument: vertex already exists');
  this.verticesObj[v] = [];
  this.vertexCount++;
}

/**
 * Removes an existing vertex from the graph.
 *
 * @param  {Any} v vertex
 * @throws Not Found error, unless the vertex does exist in the graph
 */
G.removeVertex = function removeVertex(v) {
  const adj1 = this.verticesObj[v];
  if (!adj1) throw new Error('Not Found: vertex not found');
  adj1.forEach((adj) => {
    this.verticesObj[adj].splice(adj.indexOf(adj1), 1);
    this.edgeCount--;
  });
  delete this.verticesObj[v];
  this.vertexCount--;
}

/**
 * Adds an edge to connect two vertices directly with eachother.
 *
 * @param {Any} v1 first vertex
 * @param {Any} v2 second vertex
 * @throws Illegal Argument error, unless the verteces are different
 * @throws Illegal Argument error, unless the verteces have no edge between eachother yet
 * @throws Not Found error, unless the vertex does exist in the graph
 */
G.addEdge = function addEdge(v1, v2) {
  if (v1 === v2) throw new Error('Illegal Argument: vertices are the same');
  const adj1 = this.verticesObj[v1];
  const adj2 = this.verticesObj[v2];
  if (adj1.includes(v2)) throw new Error('Illegal Argument: vertices are already have edge between eachother');
  if (!adj1 || !adj2) throw new Error('Not Found: vertex not found');
  adj1.push(v2);
  adj2.push(v1);
  this.edgeCount++;
}

/**
 * Removes an edge from two vertices directly connected vertices.
 *
 * @param  {Any} v1 first vertex
 * @param  {Any} v2 second vertex
 * @throws Not Found error, unless the vertex does exist in the graph
 */
G.removeEdge = function removeEdge(v1, v2) {
  const adj1 = this.verticesObj[v1];
  const adj2 = this.verticesObj[v2];
  if (!adj1 || !adj2) throw new Error('Not Found: vertex not found');
  adj1.splice(adj1.indexOf(v2), 1);
  adj2.splice(adj2.indexOf(v1), 1);
  this.edgeCount--;
}

/**
 * Returns all adjecent vertices of a vertex (connected by edges).
 *
 * @param  {Any} v vertex
 * @return {Any[]}   adjecent vertices
 */
G.adj = function adj(v) {
  return this.verticesObj[v];
}

/**
 * Returns all vertices in the graph.
 *
 * @return {Any[]} vertices
 */
G.vertices = function vertices() {
  return Object.keys(this.verticesObj);
}

module.exports = Graph;
