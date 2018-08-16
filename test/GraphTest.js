const { assert } = require('chai');
const { Graph } = require('../index');

describe('Graph', () => {
  it('Graph should initialize with a 0 verices and 0 edges', () => {
    const graph = new Graph();

    // Assert vertex and edge count
    assert.equal(graph.vertexCount, 0);
    assert.equal(graph.edgeCount, 0);
  });

  it('addVertext() should throw an error if the vertex already exists', () => {
    const vertex = '5';
    const graph = new Graph();

    // Add vertex
    graph.addVertex(vertex);

    // Assert error
    assert.throws(() => { graph.addVertex(vertex); }, Error);
  });

  it('addVertext() should add a vertex to the graph', () => {
    const graph = new Graph();

    // Assert before
    assert.equal(graph.vertexCount, 0);

    // Add 5 verteces
    graph.addVertex('2');
    graph.addVertex('4');
    graph.addVertex('8');
    graph.addVertex('16');
    graph.addVertex('32');

    // Assert vertex count
    assert.equal(graph.vertexCount, 5);

    // Assert vertices in graph
    const vertices = graph.vertices()
    assert.equal(vertices.includes('2'), true);
    assert.equal(vertices.includes('4'), true);
    assert.equal(vertices.includes('8'), true);
    assert.equal(vertices.includes('16'), true);
    assert.equal(vertices.includes('32'), true);
  });

  it("addEdge() should throw an error if the vertex doesn't exist", () => {
    const vertex = '5';
    const graph = new Graph();

    // Add vertex
    graph.addVertex(vertex);

    // Assert error
    assert.throws(() => { graph.addEdge(vertex, '6'); }, Error);
    assert.throws(() => { graph.addEdge('6', vertex); }, Error);
  });

  it("addEdge() should throw an error if the vertices are the same", () => {
    const vertex = '5';
    const graph = new Graph();

    // Add vertex
    graph.addVertex(vertex);

    // Assert error
    assert.throws(() => { graph.addEdge(vertex, vertex); }, Error);
  });

  it("addEdge() should throw an error when the vertices are already connected", () => {
    const vertex1 = '5';
    const vertex2 = '25';
    const graph = new Graph();

    // Add vertices
    graph.addVertex(vertex1);
    graph.addVertex(vertex2);

    // Add edge
    graph.addEdge(vertex1, vertex2);

    // Assert error
    assert.throws(() => { graph.addEdge(vertex1, vertex2); }, Error);
  });

  it('addEdge() should add an edge to the graph', () => {
    const graph = new Graph();

    // Add 5 verteces
    graph.addVertex('2');
    graph.addVertex('4');
    graph.addVertex('8');
    graph.addVertex('16');
    graph.addVertex('32');

    // Assert before
    assert.equal(graph.edgeCount, 0);

    // Add 3 edges
    graph.addEdge('2', '4');
    graph.addEdge('4', '32');
    graph.addEdge('8', '16');

    // Assert
    assert.equal(graph.edgeCount, 3);
    assert.equal(graph.adj('2').includes('4'), true);
    assert.equal(graph.adj('4').includes('2'), true);
    assert.equal(graph.adj('4').includes('32'), true);
    assert.equal(graph.adj('8').includes('16'), true);
  });

  it("removeVertex() should throw an error if the vertex doesn't exist", () => {
    const graph = new Graph();

    // Assert error
    assert.throws(() => { graph.removeVertex('5'); }, Error);
  });

  it('removeVertex() should remove a vertex from the graph', () => {
    const graph = new Graph();

    // Assert before
    assert.equal(graph.vertexCount, 0);
    assert.equal(graph.edgeCount, 0);

    // Add 5 verteces
    graph.addVertex('2');
    graph.addVertex('4');
    graph.addVertex('8');
    graph.addVertex('16');
    graph.addVertex('32');

    // Add 3 edges
    graph.addEdge('2', '4');
    graph.addEdge('4', '32');
    graph.addEdge('8', '16');

    // Assert before
    assert.equal(graph.vertexCount, 5);
    assert.equal(graph.edgeCount, 3);

    // Remove 2 vertices
    graph.removeVertex('2');
    graph.removeVertex('16');

    // Assert
    assert.equal(graph.vertexCount, 3);
    assert.equal(graph.edgeCount, 1);
    assert.equal(graph.adj('4').includes('2'), false);
    assert.equal(graph.adj('8').includes('16'), false);
    const vertices = graph.vertices()
    assert.equal(vertices.includes('2'), false);
    assert.equal(vertices.includes('16'), false);
  });

  it("removeEdge() should throw an error if the vertex doesn't exist", () => {
    const graph = new Graph();

    // Assert error
    assert.throws(() => { graph.removeEdge('5'); }, Error);
  });

  it('removeEdge() should remove an edge between two vertices', () => {
    const graph = new Graph();

    // Assert before
    assert.equal(graph.edgeCount, 0);

    // Add 5 verteces
    graph.addVertex('2');
    graph.addVertex('4');
    graph.addVertex('8');
    graph.addVertex('16');
    graph.addVertex('32');

    // Add 3 edges
    graph.addEdge('2', '4');
    graph.addEdge('4', '32');
    graph.addEdge('8', '16');

    // Assert before
    assert.equal(graph.edgeCount, 3);

    // Remove 2 edges
    graph.removeEdge('2', '4');
    graph.removeEdge('8', '16');

    // Assert
    assert.equal(graph.edgeCount, 1);
    assert.equal(graph.adj('2').includes('4'), false);
    assert.equal(graph.adj('4').includes('2'), false);
    assert.equal(graph.adj('4').includes('32'), true);
    assert.equal(graph.adj('32').includes('4'), true);
    assert.equal(graph.adj('8').includes('16'), false);
    assert.equal(graph.adj('16').includes('18'), false);
  });

  it('adj() should return all adjecent vertices of a vertex (connected by edges)', () => {
    const graph = new Graph();

    // Add 5 verteces
    graph.addVertex('2');
    graph.addVertex('4');
    graph.addVertex('8');
    graph.addVertex('16');
    graph.addVertex('32');

    // Add 3 edges
    graph.addEdge('2', '4');
    graph.addEdge('4', '32');
    graph.addEdge('8', '16');

    // Assert
    const adj2 = graph.adj('2');
    const adj4 = graph.adj('4');
    const adj8 = graph.adj('8');
    const adj16 = graph.adj('16');
    const adj32 = graph.adj('32');
    assert.equal(adj2.length, 1);
    assert.equal(adj4.length, 2);
    assert.equal(adj8.length, 1);
    assert.equal(adj16.length, 1);
    assert.equal(adj32.length, 1);
    assert.equal(adj2.includes('4'), true);
    assert.equal(adj4.includes('2'), true);
    assert.equal(adj4.includes('32'), true);
    assert.equal(adj32.includes('4'), true);
    assert.equal(adj8.includes('16'), true);
    assert.equal(adj16.includes('8'), true);
  });

  it('vertices() should return a list of all vertices in the graph', () => {
    const graph = new Graph();

    // Add 5 verteces
    graph.addVertex('2');
    graph.addVertex('4');
    graph.addVertex('8');
    graph.addVertex('16');
    graph.addVertex('32');

    // Assert vertices in graph
    const vertices = graph.vertices()
    assert.equal(vertices.includes('2'), true);
    assert.equal(vertices.includes('4'), true);
    assert.equal(vertices.includes('8'), true);
    assert.equal(vertices.includes('16'), true);
    assert.equal(vertices.includes('32'), true);
    assert.equal(vertices.includes('not found'), false);
  });
});
