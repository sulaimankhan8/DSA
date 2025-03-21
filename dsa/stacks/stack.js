// Implement a Stack (Using Array)
function Stack(size){
    this.stack= new Array(size);
    this.top=-1;
}

Stack.prototype.length = function(){
    return this.top + 1;
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
s1.push(15);
console.log(s1.pop()); // 15
console.log(s.isEmpty());
console.log(s.peek());

console.log("--------------------------");
//-----------------------------------------------------------------------
/* Monotonic Stack Used in "Next Greater Element" problems)


*/

function nge(nums){
    let n =nums.length;
    const stack = new Stack(n);
    let res=new Array(n).fill(-1);

    for(let i=0;i<n;i++){
        while(!stack.isEmpty() && nums[i]>nums[stack.peek()]){
            let index=stack.pop();
            res[index]=nums[i];
        }
        stack.push(i);
    }
    return res;
}

console.log(nge([2, 1, 2, 4, 3]));

/*Iteration
i = 0 (nums[0] = 2)
stack is empty, so push(0)
stack = [0], top = 0
i = 1 (nums[1] = 1)
top of stack = index 0 (value 2), nums[1] = 1 is not greater than nums[0] = 2
push(1)
stack = [0, 1], top = 1
i = 2 (nums[2] = 2)
check top: index 1 (value = 1), 2 > 1 ✅
pop index 1, set result[1] = 2
result = [-1, 2, -1, -1, -1]
check new top: index 0 (value = 2), 2 > 2? ❌ not greater
push(2)
stack = [0, 2]
i = 3 (nums[3] = 4)
top index = 2 (nums[2] = 2), 4 > 2 ✅
pop(2), result[2] = 4
result = [-1, 2, 4, -1, -1]
top index = 0 (nums[0] = 2), 4 > 2 ✅
pop(0), result[0] = 4
result = [4, 2, 4, -1, -1]
stack empty now, push(3)
stack = [3]
i = 4 (nums[4] = 3)
top = index 3 (nums[3] = 4), 3 > 4? ❌
push(4)
stack = [3,4]*/
console.log("--------------------------");
//-----------------------------------------------------------------------
/* 
