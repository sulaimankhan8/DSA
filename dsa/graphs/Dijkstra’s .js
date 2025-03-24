const cities= 7;
const roads = [
  [0, 6, 7],
  [0, 1, 2],
  [1, 2, 3],
  [1, 3, 3],
  [6, 3, 3],
  [3, 5, 1],
  [6, 5, 1],
  [2, 5, 1],
  [0, 4, 5],
  [4, 6, 2]
];
//build adjacency list
function Graph(n,roads) {
    const graph=Array.from({length:n},() =>[]);
    for(let [u,v,w] of roads){
        graph[u].push([v,w]);
        graph[v].push([u,w]);
    }
    return graph;
}

const graph=Graph(cities,roads);
console.log(graph);

function dijkstra(graph, start) {
    const distance = new Array(graph.length).fill(Infinity);
    const ways = new Array(graph.length).fill(0);
    const visited = new Set();

    distance[start] = 0;
    ways[start] = 1;

    const queue = [[start, 0]];

    while (queue.length > 0) {
        queue.sort((a, b) => b[1] - a[1]);
        const [node, dist] = queue.pop();

        if (visited.has(node)) continue;
        visited.add(node);

        for (const [next, weight] of graph[node]) {
            const newDist = dist + weight;
            if (newDist < distance[next]) {
                distance[next] = newDist;
                ways[next] = ways[node]; 
                queue.push([next, newDist]);
            } else if (newDist === distance[next]) {
                ways[next] += ways[node];
            }
        }
    }

    return { distance, ways };
}


const dij=dijkstra(graph,0);
console.log(dij);
