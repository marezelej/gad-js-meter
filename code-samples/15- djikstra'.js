function djikstra (graph, V, src) {
    const vis = Array(V).fill(0)
    const dist = []
    for (let i = 0; i < V; i++) dist.push([10000, -1])
    dist[src][0] = 0
  
    for (let i = 0; i < V - 1; i++) {
      let mn = -1
      for (let j = 0; j < V; j++) {
        if (vis[j] === 0) {
          if (mn === -1 || dist[j][0] < dist[mn][0]) mn = j
        }
      }
  
      vis[mn] = 1
      for (let j = 0; j < graph[mn].length; j++) {
        const edge = graph[mn][j]
        if (vis[edge[0]] === 0 && dist[edge[0]][0] > dist[mn][0] + edge[1]) {
          dist[edge[0]][0] = dist[mn][0] + edge[1]
          dist[edge[0]][1] = mn
        }
      }
    }
  
    return dist
  }

  function djikstra2impl(edges, numVertices, startVertex) {
    var done = new Array(numVertices);
    done[startVertex] = true;
    var pathLengths = new Array(numVertices);
    var predecessors = new Array(numVertices);
    for (var i = 0; i < numVertices; i++) {
      pathLengths[i] = edges[startVertex][i];
      if (edges[startVertex][i] != Infinity) {
        predecessors[i] = startVertex;
      }
    }
    pathLengths[startVertex] = 0;
    for (var i = 0; i < numVertices - 1; i++) {
      var closest = -1;
      var closestDistance = Infinity;
      for (var j = 0; j < numVertices; j++) {
        if (!done[j] && pathLengths[j] < closestDistance) {
          closestDistance = pathLengths[j];
          closest = j;
        }
      }
      done[closest] = true;
      for (var j = 0; j < numVertices; j++) {
        if (!done[j]) {
          var possiblyCloserDistance = pathLengths[closest] + edges[closest][j];
          if (possiblyCloserDistance < pathLengths[j]) {
            pathLengths[j] = possiblyCloserDistance;
            predecessors[j] = closest;
          }
        }
      }
    }
    return pathLengths
  }
  