class minheap {
    #heap;
    constructor() {
    this.#heap=[];
     }
    
    insert(val){
        this.#heap.push(val);
        this.#bubbleUp();
    } 
    #bubbleUp(){
        let lastIndex = this.#heap.length -1;
        while(lastIndex>0){
            let parent = Math.floor((lastIndex-1)/2);
            if(this.#heap[parent]>this.#heap[lastIndex]){
                [this.#heap[parent],this.#heap[lastIndex]]=[this.#heap[lastIndex],this.#heap[parent]];
                lastIndex=parent;
            }else{break;}
        }
    }
    extract(){
        if(this.#heap.length===0) return null;
        if(this.#heap.length===1) return this.#heap.pop();

        let min=this.#heap[0];
        this.#heap[0]=this.#heap.pop();

        this.#sinkDown(0);
        return min;
    }

    #sinkDown(i){
        let smallest =i;
        let left=2*i +1;
        let right=2*i +2;

        if(left<this.#heap.length && this.#heap[left]<this.#heap[smallest]) {smallest=left;}
        if(right<this.#heap.length && this.#heap[right]<this.#heap[smallest]) {smallest=right;}

        if(smallest !==i){
            [this.#heap[smallest],this.#heap[i]]=[this.#heap[i],this.#heap[smallest]];
            this.#sinkDown(smallest);
        }


    }
    
    getHeap() {
        return this.#heap;
    }

}


const minHeap = new minheap();
minHeap.insert(4);
minHeap.insert(2);
minHeap.insert(7);
minHeap.insert(1);

console.log(minHeap.getHeap()); 

console.log(minHeap.extract()); // 1
console.log(minHeap.getHeap()); 