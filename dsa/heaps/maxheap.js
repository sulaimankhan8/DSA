class maxheap{
    #heap;
    constructor(){
        this.#heap=[];
    }

    insert(val){
        this.#heap.push(val);
        this.#bubbleUp();
    }

    #bubbleUp(){
        let lastIndex = this.#heap.length-1;

        while(lastIndex>0){
            let parent=Math.floor((lastIndex-1)/2);
            if(this.#heap[parent] <this.#heap[lastIndex]){
                [this.#heap[parent] ,this.#heap[lastIndex]]=[this.#heap[lastIndex] ,this.#heap[parent]];
                lastIndex=parent;
                
            }else{break;}
        }
    }

    extract(){
        if(this.#heap.length===0) return null;
        if(this.#heap.length===1) return this.#heap.pop();

        let max=this.#heap[0];
        this.#heap[0]=this.#heap.pop();

        this.#sinkDown(0)
        return max;
    
    }

    #sinkDown(i){
      let max=i;
      let left=2*i+1; 
      let right=2*i+2; 

      if(left<this.#heap.length && this.#heap[left]>this.#heap[max]) {max=left;}
      if(right<this.#heap.length && this.#heap[right]>this.#heap[max]) {max=right;}

      if(max !== i){
        [this.#heap[i],this.#heap[max]]=[this.#heap[max],this.#heap[i]];
        this.#sinkDown(max);
      }
    }



    getHeap() {
        return this.#heap;
    }

}


const heap = new maxheap();
heap.insert(10);
heap.insert(4);
heap.insert(15);
heap.insert(1);
heap.insert(7);

console.log("Current Heap:", heap.getHeap());

console.log("Extracted max:", heap.extract()); 
console.log("Heap after extract:", heap.getHeap());

console.log("Extracted max:", heap.extract()); 
console.log("Heap after extract:", heap.getHeap());