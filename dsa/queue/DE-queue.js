//Implementation of Deque (Using Array)
function Deque(size){
    this.deque = new Array(size);
    this.front=-1;
    this.rear=-1;
    this.size=size;

}

Deque.prototype.isEmpty = function(){
    return this.front === -1;
}
Deque.prototype.isFull = function(){
    return (this.rear + 1)% this.size=== this.front;
}
Deque.prototype.insertFront = function (data ){
    if(this.isFull()){
        console.log("deque overflow");
        return ;}

        if(this.front===-1){
            this.front=this.rear=0;
        }else if(this.front === 0){
            this.front=this.size-1;
        }else{
            this.front--;
        }
        this.deque[this.front]=data;
}

Deque.prototype.insertLast= function(data){
    if(this.isFull()){
        console.log("deque overflow");
        return ;}

        if(this.isFull()){
            this.front = this.rear=0
        }else if(this.rear === this.size -1){
            this.rear=0;
        }else{
            this.rear++;
        }
        this.deque[this.rear]=data;
}

Deque.prototype.deleteFront= function(){
    if(this.front ===-1){
        console.log("Deque underflow");
        return null;
    }
    let temp=this.deque[this.front];

    if(this.front===this.rear){
        this.front=this.rear=-1;
    }else if(this.front === this.size -1){
        this.front=0
    }else{
        this.front++
    }
    return temp;
}


Deque.prototype.deleteLast= function(){
    if(this.front ===-1){
        console.log("Deque underflow");
        return null;
    }
    let temp=this.deque[this.rear];

    if(this.front === this.rear){
        this.front=this.rear=-1
    }else if(this.rear ===0){
        this.rear = this.size -1;
    }else{
        this.rear--;
    }
    return temp;
}


Deque.prototype.getFront= function(){
    if(this.isEmpty()){
        console.log("Deque is Empty");
            return;
    }
    return this.deque[this.front];
}
Deque.prototype.getRear= function(){
    if(this.isEmpty()){
        console.log("Deque is Empty");
            return;
    }
    return this.deque[this.rear];
}


let dq = new Deque(5);
dq.insertFront(10);
dq.insertLast(20);
console.log(dq.getFront()); 
console.log(dq.getRear()); 
dq.deleteFront();
console.log(dq.getFront()); 
console.log("-----------------------------------------------------"); 

//----------------------------------------------------------------------
//Palindrome Checker using Deque


function palandrome(str){
    let n = str.length;
 let deq= new Deque(n);
 for(let s of str){
    deq.insertFront(s);
 }

 while(!deq.isEmpty()){
    let front=deq.deleteFront();
      if(deq.isEmpty()) break;      
    let rear=deq.deleteLast();
      if(front !== rear) return false;    
}
return true;
}

console.log(palandrome("carrac"));
console.log(palandrome("plain"));
console.log(palandrome("level"));