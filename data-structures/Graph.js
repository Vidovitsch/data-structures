function Graph() {
  this.verticesObj = {};
}

const G = prototype.Graph;

G.addVertex = function addVertex(v) {
  if (this.verticesObj[v]) throw new Error('Illegal argument: vertex already exists');
  this.verticesObj[v] = [];
}

G.removeVertex = function removeVertex(v) {
  const adj1 = this.verticesObj[v];
  if (!adj1) throw new Error('Not Found: vertex not found');
  adj1.forEach((adj) => {
    adj.splice(adj.indexOf(adj1), 1);
  });
  delete this.verticesObj[v];
}

G.addEdge = function addEdge(v1, v2) {
  const adj1 = this.verticesObj[v1];
  const adj2 = this.verticesObj[v2];
  if (!adj1 || !adj2) throw new Error('Not Found: vertex not found');
  adj1.push(v2);
  adj2.push(v1);
}

G.removeEdge = function removeEdge(v1, v2) {
  const adj1 = this.verticesObj[v1];
  const adj2 = this.verticesObj[v2];
  if (!adj1 || !adj2) throw new Error('Not Found: vertex not found');
  adj1.splice(adj1.indexOf(v2), 1);
  adj2.splice(adj2.indexOf(v1), 1);
}

G.adj = function adj(v) {
  return this.verticesObj[v];
}

G.vertices = function vertices() {
  return Object.keys(this.verticesObj);
}

module.exports = Graph;
