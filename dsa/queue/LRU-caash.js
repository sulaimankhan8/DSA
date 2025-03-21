/* What is LRU Cache (in plain English)?
"LRU" = Least Recently Used.
We have a cache with limited capacity (for example, only 2 items).
When we put items, they get stored.
When we get an item, that item becomes the most recently used (moves to the front).
If the cache is full and we add a new item, we remove the least recently used one (the one used longest ago).
✅ How does it work inside?
We need two structures:

Doubly Linked List —

The most recently used item stays at the front (head).
The least recently used item is at the end (tail).
Each item has prev and next pointers so we can quickly remove/move nodes.
Hash Map (JS object) —

Key ➡️ node reference.
So get(key) happens in O(1), by looking up the node.
function Node(key,value){
    this.key=key;
    this.value=value;
    this.next=null;
    this.prev=null;
}
*/
function LRU_cashe(capasity){
    this.capasity=capasity;
    this.map={};
    this.head = new Node(0,0);
    this.tail = new Node(0,0);
    this.head.next=this.tail;
    this.tail.prev=this.head;
}

LRU_cashe.prototype._addNode=function(node){
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev=node;
    this.head.next=node;
}

LRU_cashe.prototype._removeNode=function(node){
    node.prev.next=node.next;
    node.next.prev=node.prev;
}

LRU_cashe.prototype._moveToFront=function(node){
    this._removeNode(node);
    this._addNode(node);
}
LRU_cashe.prototype._evictLRU=function(){
    const lru=this.tail.prev;
    this._removeNode(lru);
    delete this.map[lru.key]
}

LRU_cashe.prototype.get=function(key){
    if(this.map[key]){
        this._moveToFront(this.map[key]);
        return this.map[key].value;

    }
    return -1;

}
 
LRU_cashe.prototype.put=function(key,value){
if(this.map[key]){
    this.map[key].value=value;
    this._moveToFront(this.map[key]);
}else{
    const newNode =new Node(key,value);
    this.map[key] = newNode;
    this._addNode(newNode);
    if(Object.keys(this.map).length>this.capasity){
        this._evictLRU();
    }
}
}
 
const cache = new LRU_cashe(2);

cache.put(1, 1); // cache: {1=1}
cache.put(2, 2); // cache: {1=1, 2=2}
console.log(cache.get(1)); // returns 1, now order {2=2, 1=1}
cache.put(3, 3); // evicts key 2, cache: {1=1, 3=3}
console.log(cache.get(2)); // -1 (not found)
cache.put(4, 4); // evicts key 1, cache: {3=3, 4=4}
console.log(cache.get(1)); // -1 (not found)
console.log(cache.get(3)); // returns 3
console.log(cache.get(4)); // returns 4
console.log("----------------------------------------------------"); // 

 //--------------------------------------------------------------------
 //--------------------------------------------------------------------
 //--------------------------------------------------------------------
// LRU cache Use a class with #private fields for abstraction (without closurers) 

class LRUCache {
    #capacity;
    #map;
    #head;
    #tail;

    constructor(capacity) {
        this.#capacity = capacity;
        this.#map = {};
        this.#head = new Node(0, 0);
        this.#tail = new Node(0, 0);
        this.#head.next = this.#tail;
        this.#tail.prev = this.#head;
    }

    #addNode(node) {
        node.prev = this.#head;
        node.next = this.#head.next;
        this.#head.next.prev = node;
        this.#head.next = node;
    }

    #removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    #moveToFront(node) {
        this.#removeNode(node);
        this.#addNode(node);
    }

    #evictLRU() {
        const lru = this.#tail.prev;
        this.#removeNode(lru);
        delete this.#map[lru.key];
    }

    get(key) {
        if (this.#map[key]) {
            this.#moveToFront(this.#map[key]);
            return this.#map[key].value;
        }
        return -1;
    }

    put(key, value) {
        if (this.#map[key]) {
            this.#map[key].value = value;
            this.#moveToFront(this.#map[key]);
        } else {
            const newNode = new Node(key, value);
            this.#map[key] = newNode;
            this.#addNode(newNode);
            if (Object.keys(this.#map).length > this.#capacity) {
                this.#evictLRU();
            }
        }
    }

    // ✅ size() method
    size() {
        return Object.keys(this.#map).length;
    }

    // ✅ print() to visualize from most recent to least recent
    print() {
        let curr = this.#head.next;
        let result = [];
        while (curr !== this.#tail) {
            result.push(`[${curr.key}=${curr.value}]`);
            curr = curr.next;
        }
        console.log(result.join(" <-> "));
    }
}
const cach = new LRUCache(2);

cach.put(1, 1); // {1=1}
cach.print(); // [1=1]
cach.put(2, 2); // {2=2, 1=1}
cach.print(); // [2=2] <-> [1=1]
console.log(cach.get(1)); // returns 1
cach.print(); // Still [1=1] <-> [2=2] (1 became most recent)
cach.put(3, 3); // evicts key 2, cache: {3=3, 1=1}
cach.print(); // [3=3] <-> [1=1]
console.log(cach.get(2)); // -1 (not found)
cach.put(4, 4); // evicts key 1, cache: {4=4, 3=3}
cach.print(); // [4=4] <-> [3=3]
console.log(cach.get(1)); // -1
console.log(cach.get(3)); // 3
console.log(cach.get(4)); // 4
console.log("Current size:", cach.size()); // 2
