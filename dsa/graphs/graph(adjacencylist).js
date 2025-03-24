

const ifExist=function(graph,from ,to) {//helper function to check for duplicate edges
    let exist=false;
    for(let i of graph[from]){
        if(i===to){
            exist=true;
            break;
        }
    }
    return exist;
}



//✅ 1. Undirected Unweighted Graph (Adjacency List)
//No directions, just plain connections.



const UUGraph ={};

function addUndirectedEdges(u,v){
    if(!UUGraph[u]) UUGraph[u]=[];// Creates a key named "a" because u = "a"
    if(!UUGraph[v]) UUGraph[v]=[];

    if(!ifExist(UUGraph,u,v))
    UUGraph[u].push(v);

    if(!ifExist(UUGraph,v,u))
    UUGraph[v].push(u);
}



addUndirectedEdges("a", "b");
addUndirectedEdges("a", "c");
addUndirectedEdges("b", "d");
addUndirectedEdges("b", "e");
addUndirectedEdges("c", "f");
addUndirectedEdges("d", "g");
addUndirectedEdges("e", "h");
addUndirectedEdges("f", "i");
addUndirectedEdges("g", "j");
addUndirectedEdges("h", "k");
addUndirectedEdges("j", "k");   // making a cycle between j and k
addUndirectedEdges("f", "d"); 

console.log("undirected unweighted graph :",UUGraph);
console.log("==============================================================");
//-----------------------------------------------------------------------
//✅ 2. Directed Unweighted Graph (Adjacency List)
//Connections only one way.



const DUGraph={};
function addDirectedEdge(u,v) {
    if(!DUGraph[u]) DUGraph[u]=[];
    let exist =ifExist(DUGraph,u,v);
    
    if(!exist)
    DUGraph[u].push(v);
}

addDirectedEdge("A", "B");
addDirectedEdge("A", "B");
addDirectedEdge("A", "A");
addDirectedEdge("A", "A");
addDirectedEdge("A", "C");
addDirectedEdge("B", "D");

console.log("Directed unweighted Graph:", DUGraph);
console.log("=========================================================");

//-----------------------------------------------------------------------
//✅ 3. Undirected Weighted Graph (Adjacency List)
//Same as undirected, but each edge has a weight (cost/distance).


const ifSame=function(graph,from,to,weight){
    let exist=false;
    for (let i = 0; i < graph[from].length; i++) {
        if (graph[from][i].node===to && graph[from][i].w===weight) {
            exist=true;
            break;
        }
        
    }
    return exist;
}
const UWGraph={};

function addUWEdges(u,v,w) {
    if(!UWGraph[u]) UWGraph[u]=[];
    if(!UWGraph[v]) UWGraph[v]=[];

    if(!ifSame(UWGraph,u,v,w))
    UWGraph[u].push({node:v,w});

    if(!ifSame(UWGraph,v,u,w))
    UWGraph[v].push({node:u,w});
}

addUWEdges("A", "B", 4);
addUWEdges("A", "C", 2);
addUWEdges("A", "A", 0);
addUWEdges("A", "A", 0);
addUWEdges("A", "A", 0);
addUWEdges("B", "D", 5);

console.log("Undirected Weighted Graph:", UWGraph);
console.log("==========================================================");

//-----------------------------------------------------------------------

//✅ 4. Directed Weighted Graph (Adjacency List)
//Direction + weights.

const DWGraph={};

function addDWEdges(u,v,w) {
    if(!DWGraph[u]) DWGraph[u]=[];
   
    if(!ifSame(DWGraph,u,v,w))
        DWGraph[u].push({node:v,w});
 
}

addDWEdges("A", "B", 4);
addDWEdges("A", "C", 2);
addDWEdges("A", "A", 0);
addDWEdges("A", "A", 0);
addDWEdges("A", "A", 0);
addDWEdges("B", "D", 5);

console.log("directed Weighted Graph:", DWGraph);
console.log("===========================================================");
//-------------------------------------------------------------------------

const nodes=["A","B","C","D"];
const size=nodes.length;
const matrix_adj=Array.from({length:size},() => new Array(size).fill(0));

function addMatrixEdge(u,v) {
    const i=nodes.indexOf(u);
    const j=nodes.indexOf(v);

    matrix_adj[i][j]=1 ;
    matrix_adj[j][i]=1 ;
    
}

addMatrixEdge("A", "B");
addMatrixEdge("A", "C");
addMatrixEdge("B", "D");

console.log("Adjacency Matrix (Undirected):", matrix_adj);
console.log("============================================");

//------------------------------------------------------------------------
//1️⃣ Depth-First Search (DFS)
//DFS means going as far as possible in one direction before backtracking.
//You can do this recursively or using a stack.
/*
function dfs(graph,start,visited= new Set()){
    if(visited.has(start)) return;
    console.log(start);
    visited.add(start);
    for(let node of graph[start] || []){
        const nodee= typeof node === 'object'?node.node :node
        dfs(graph,nodee,visited);
    }
}*/
function dfs(graph,start){
    let visited=new Set();
    let stack=[start];

    while(stack.length>0){
    let node=stack.pop();
    
    if(!visited.has(node)){
        console.log(node);
        visited.add(node);

        for(let neighbor of graph[node] || []){

            if (typeof neighbor==='object') {
                console.log(`Edge: ${node} -> ${neighbor.node}(weight: ${neighbor.w})`);
                
                stack.push(neighbor.node);  
            }else{
            
            stack.push(neighbor);}
        
        }
    }
    }
}
dfs(UUGraph,"a" );
console.log("dfs===========================================");

dfs(DUGraph,"A");
console.log("===========================================");

dfs(UWGraph,"A");
console.log("===========================================");

dfs(DWGraph,"A");
console.log("===========================================");


//-----------------------------------------------------------------------
//2️⃣ Breadth-First Search (BFS)
//BFS means going level by level.
//You use a queue for BFS.

function bfs(graph,start) {
    const visited= new Set();
    const queue=[start];

    while (queue.length>0) {
        const node=queue.shift();
        if(!visited.has(node)){
            
            console.log(node);
            visited.add(node)
            for(let neighbor of graph[node] || []){

                if (typeof neighbor==='object') {
                    console.log(`Edge: ${node} -> ${neighbor.node}(weight: ${neighbor.w})`);
                    
                    queue.push(neighbor.node);  
                }else{
                
                queue.push(neighbor);}
            }
        }
        
    }
    
}
console.log("bfs");
bfs(UUGraph,"a" );
console.log("===========================================");

bfs(DUGraph,"A");
console.log("===========================================");

bfs(UWGraph,"A");
console.log("===========================================");

bfs(DWGraph,"A");
console.log("===========================================");
