function minimumCostWalk(n, edges, queries) {
    // Build adjacency list
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v, w] of edges) {
        adj[u].push([v, w]);
        adj[v].push([u, w]);
    }

    // Function to perform BFS and find the minimum AND cost
    function bfs(start, end) {
        if (start === end) {
            return 0; // No edges traversed, AND is undefined, but cost is 0
        }

        const visited = new Map(); // {node: minimum AND value so far}
        const queue = [];
        queue.push([start, (1 << 30) - 1]); // Start with all bits set (maximum possible AND)

        while (queue.length > 0) {
            const [node, currentAnd] = queue.shift();

            for (const [neighbor, weight] of adj[node]) {
                const newAnd = currentAnd & weight;

                if (newAnd === 0) {
                    // If the AND becomes 0, we can't get any better, so return 0
                    return 0;
                }

                if (neighbor === end) {
                    // If we reach the target node, update the minimum AND
                    if (!visited.has(neighbor) || newAnd < visited.get(neighbor)) {
                        visited.set(neighbor, newAnd);
                    }
                }

                if (!visited.has(neighbor) || newAnd < visited.get(neighbor)) {
                    visited.set(neighbor, newAnd);
                    queue.push([neighbor, newAnd]);
                }
            }
        }

        return visited.has(end) ? visited.get(end) : -1;
    }

    // Process each query
    const result = [];
    for (const [s, t] of queries) {
        result.push(bfs(s, t));
    }

    return result;
}

// Example usage:
const n = 4;
const edges = [
    [0, 1, 1],
    [1, 2, 2],
    [2, 3, 3],
    [0, 3, 4],
];
const queries = [
    [0, 3],
    [1, 2],
    [0, 2],
];

console.log(minimumCostWalk(n, edges, queries)); // Output: [0, 2, 0]