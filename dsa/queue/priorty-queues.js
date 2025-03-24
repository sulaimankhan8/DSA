// Priority Queue
class priorityQueues{
    #value;
    constructor(){
        this.#value=[];
    }
    enqueue(val,prio){
        this.#value.push({val,prio});
        this.#bubbleUp();
    }

    #bubbleUp(){
        let lastIndex=this.#value.length-1;

        while (lastIndex>0) {
            let parentIndex=Math.floor((lastIndex-1)/2);
            const parent=this.#value[parentIndex];
            const element=this.#value[lastIndex];

            if(element.prio<=parent.prio){
                [this.#value[parentIndex],this.#value[lastIndex]]= [this.#value[lastIndex],this.#value[parentIndex]];

                lastIndex=parentIndex;

            }else{
                break;
            }
            
        }
    }

    dequeue(){
        if(this.#value.length===0) return null;
        if(this.#value.length===1) return this.#value.pop();

        const temp=this.#value[0];
        this.#value[0]=this.#value.pop();

        this.#sinkDown(0);
        return temp;
    }

    #sinkDown(i){
        let current=i;
        let left = 2*i+1;
        let right = 2*i+2;

        if(left<this.#value.length && this.#value[left].prio<this.#value[current].prio)current=left;
        if(right<this.#value.length && this.#value[right].prio<this.#value[current].prio)current=right;

        if(current !== i){
            [this.#value[i],this.#value[current]]=[this.#value[current],this.#value[i]];
            i=current;
            this.#sinkDown(i);
        }

    }
    get(){
        return this.#value;
    }
}

const pq = new priorityQueues();
pq.enqueue("low priority task", 5);
pq.enqueue("medium priority task", 3);
pq.enqueue("urgent task", 1);

console.log(pq.get());

console.log(pq.dequeue()); 
// Should log: { val: 'urgent task', prio: 1 }

console.log(pq.dequeue()); 
// Should log: { val: 'medium priority task', prio: 3 }

console.log(pq.dequeue()); 