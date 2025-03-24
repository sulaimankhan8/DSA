class Node{
    
    constructor(node,neighbors=[]){
        this.Node=node;
        this.neighbors=neighbors;
    }
}
const node1 = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);
const node4 = new Node(4);

node1.neighbors = [node2, node3];
node2.neighbors = [node1, node4];
node3.neighbors = [node1, node4];
node4.neighbors = [node2, node3];