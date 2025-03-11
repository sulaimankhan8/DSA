// Implement a Stack (Using Array)
function Stack(size){
    this.stack= new Array(size);
    this.top=-1;
}

Stack.prototype.push=function(data){
    if(this.top === this.stack.length-1){
        console.log("Stack Overflow");
        return;
    }
    this.top++;
    this.stack[this.top]=data;
}

Stack.prototype.pop=function(){
    if(this.top===-1){
        console.log("Stack underflow");
        return;
    }
    let popedData=this.stack[this.top];
    this.top--;
    return popedData;
}
Stack.prototype.peek=function(){
    if(this.top===-1){
        console.log("Stack Empty");
        return;
    }
    return this.stack[this.top];

}
Stack.prototype.isEmpty=function(){
    return this.top===-1;

}

let s=new Stack(5);
s.push(10);
s.push(20);
s.push(30);

console.log(s.pop());
console.log(s.isEmpty());
console.log(s.peek());
console.log("--------------------------");
//-----------------------------------------------------------------------
// Implement a Stack (Using Linked List)

function Node(value){
    this.value=value;
    this.next=null;
}
function StackL(){
    this.top=null;
}

StackL.prototype.push=function(data){
    let newNode=new Node(data);
   newNode.next=this.top;
   this.top=newNode;
}

StackL.prototype.pop=function(){
   if(!this.top){
    console.log("stack overflow");
   return;
}
    let tempNode=this.top.value;
    this.top=this.top.next;
    return tempNode;
}
StackL.prototype.peek=function(){
    if(!this.top){
        console.log("Stack Empty");
        return;
    }
    return this.top.value;

}
StackL.prototype.isEmpty=function(){
    return !this.top;

}
let s1 = new StackL();
s1.push(5);
s1.push(15);G
console.log(s1.pop()); // 15
console.log(s.isEmpty());
console.log(s.peek());