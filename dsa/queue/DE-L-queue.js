//Implementation of Deque (Using Linked List)
class Node{
    constructor(val){
        this.value = val;
        this.next=null;
        this.prev=null;
    }
}

class Deque{
    constructor(){
        this.front=null;
        this.rear=null;
    }

    insertFront(data){
        let newNode=new Node(data);
        if(!this.front){
            this.front=this.rear=newNode;
        }else{
            newNode.next=this.front;
            this.front.prev=newNode;
            this.front=newNode;
        }
    }
    insertRear(data){
        let newNode=new Node(data);
        if(!this.rear){
            this.front=this.rear=newNode;
        }else{
            newNode.prev=this.rear;
            this.rear.next=newNode;
            this.rear=newNode;
        }

    }
    deleteFront(){
        if (!this.front) {
            console.log("Deque Underflow");
            return;
        }
        let temp=this.front.value;
        this.front=this.front.next;
        if(this.front){
            this.front.prev=null;
        }else{
            this.rear=null;
        }
        return temp;
    }
    deleteRear(){
        if (!this.rear) {
            console.log("Deque Underflow");
            return;
        }
        let temp=this.rear.value;
        this.rear=this.rear.value;
        if(this.rear){
            this.rear.next=null;
        }else{
            this.front=null;
        }
        return temp;
    }
    getFront(){
        if(!this.front){
            console.log("Deque is Empty");
            return;
        }
        return this.front.value;
    }
    getRear(){
        if(!this.rear){
            console.log("Deque is Empty");
            return;
        }
        return this.rear.value;
    }
    isEmpty(){
        return this.front === null;
    }
   print(){
        let current = this.front;
        let result ="";
        while(current){
            result += current.value + "->";
            current =current.next;
        }
        console.log(result + "NULL");
    }
}


let dq = new Deque();
dq.insertFront(5);
dq.insertRear(15);
console.log(dq.getFront()); // 5
console.log(dq.getRear()); // 15
dq.deleteFront();
console.log(dq.getFront()); // 15
dq.print();