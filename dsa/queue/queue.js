// Implement a Queue (Using Array)
function Queue(size){
    this.queue=new Array(size);
    this.front=-1;
    this.rear=-1;
}
Queue.prototype.enqueue=function(data){
    if(this.rear===this.queue.length-1){
        console.log("QUEUE full");
        return ;
    }
    if(this.front===-1)this.front=0;
    this.rear++;
    this.queue[this.rear]=data;

}

Queue.prototype.dequeue=function(){
    if(this.front===-1 || this.front>this.rear){
        console.log("QUEUE empty");
        return;
    }
    let tempData=this.queue[this.front];
    this.front++;
    return tempData;
}

Queue.prototype.isEmpty=function(){
    return this.front===-1 || this.front>this.rear;
}

Queue.prototype.frontElement=function(){
    if(this.front===-1 || this.front>this.rear){
        console.log("QUEUE empty");
        return;
    }
    
    return this.queue[this.front];
}

let q = new Queue(5);
q.enqueue(10);
q.enqueue(20);
console.log(q.dequeue());
console.log(q.frontElement()); 
console.log(q.isEmpty());
console.log("---------------------");
//-----------------------------------------------------------------------
//Implement a Queue (Using Linked List)

function Node(data){
    this.data=data;
    this.next=null;

}

function Queues(){
    this.front=null;
    this.rear=null;
}

Queues.prototype.enqueue=function(data){
    let newNode=new Node(data);

    if(!this.rear){
        this.front=this.rear=newNode;
        return ;
    }
    this.rear.next=newNode;
    this.rear=newNode;

}

Queues.prototype.dequeue=function(){
    if(!this.front){
        console.log("QUEUE underflow");
        return;
    }
    let tempData=this.front.data;
    this.front=this.front.next;
    if (!this.front) this.rear = null;
    return tempData;
}

Queues.prototype.isEmpty=function(){
    return !this.front;
}

Queues.prototype.frontElement=function(){
    if(!this.front){
        console.log("QUEUE empty");
        return;
    }
    
    return this.front.data;
}
Queues.prototype.print=function(){
    let current=this.front;
    let res="";
    while(current){
        res += current.data +"=>";
        current=current.next;
    }
    console.log(res +"NUll");
}
let q1 = new Queues();
q1.enqueue(5);
q1.enqueue(15);
console.log(q1.dequeue()); 
console.log(q1.frontElement()); 
console.log(q1.isEmpty()); 
q1.print();