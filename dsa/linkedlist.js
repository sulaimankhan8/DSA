function Node(data){
    this.data=data;
    this.next=null;
}
let n= new Node(10);
//console.log(n);//Node { data: 10, next: null }
//-----------------------------------------------------------------------
function LinkedList(){
    this.head=null;
}

//let LL= new LinkedList();
//console.log(LL);//LinkedList { head: null }
//-----------------------------------------------------------------------
LinkedList.prototype.append= function(data){
    let newNode =new Node(data);

    if(!this.head){
        this.head=newNode;
        return;
    }
    let currentNode=this.head;
    while(currentNode.next){
        currentNode=currentNode.next;
    }
    currentNode.next=newNode;

};
let LL= new LinkedList();
LL.append(10);
LL.append(30);
LL.append(50);
//console.log(LL);
//-----------------------------------------------------------------------
LinkedList.prototype.prepend=function(data){
    let newNode=new Node(data);
    newNode.next=this.head;
    this.head=newNode
}
//LL.prepend(55);
//console.log(LL);
//-----------------------------------------------------------------------
LinkedList.prototype.deleteNode= function(value){
    if(!this.head)return;

    if(this.head.data===value){
        this.head=this.head.next;
        return;
    }

    let currentNode=this.head;
    while(currentNode.next && currentNode.next.data!== value){
        currentNode=currentNode.next;
    }

    if(currentNode.next){
        currentNode.next=currentNode.next.next;
    }
}
//LL.deleteNode(20);
//console.log(LL);
//-----------------------------------------------------------------------
LinkedList.prototype.print=function(){
    let current = this.head;
    let result ="";
    while(current){
        result += current.data + "->";
        current =current.next;
    }
    console.log(result + "NULL");
}
LL.print();

//-----------------------------------------------------------------------

LinkedList.prototype.reverse =function(){
    let prev=null;
    let next=null;
    let current=this.head;

    while(current !== null)
    {
        next = current.next;
        current.next = prev;
        prev=current
        current=next;

    }
    this.head=prev;

}
//LL.reverse();
LL.print();

//-----------------------------------------------------------------------
LinkedList.prototype.middle =function(){
    let slow=this.head;
    let fast=this.head;

    while(fast.next !==null && fast !==null){
        slow=slow.next;
        fast=fast.next.next;
        
    }
    console.log(slow);
    return ;
}

//LL.middle();

//-----------------------------------------------------------------------

let LL2 =new LinkedList()

LL2.append(20);
LL2.append(40);
LL2.append(60);
LL2.print();

function merge(l1,l2){
    if(!l1.head) return l2;
    if(!l2.head) return l1;

    let dummy =new LinkedList();
    let current =new Node(-1);

    let p1=l1.head;
    let p2=l2.head;
    let mergedHead = current; 
    while(p1 !==null && p2!==null){
        if(p1.data>p2.data){
            
            current.next= new Node(p1.data);
            p1=p1.next;
        }else{
            
            current.next= new Node(p2.data);
            p2=p2.next;
        }
        current =current.next;
    }
    current.next = p1 !==null? p1:p2;
    dummy.head=mergedHead.next;


    return dummy ;
}

let dd=merge(LL,LL2);
dd.print();

//-----------------------------------------------------------------------

function deleteNth(ll,n){
    let dummy =new Node(-1);
    dummy.next=ll.head;
    let slow=dummy;
    let fast=dummy;
    
    for(let i=0;i<n;i++ ){
if(fast.next ===null)return ll.head
        fast=fast.next;
        }
    while(fast.next !== null){
        slow=slow.next;
        fast=fast.next;
    }
    slow.next=slow.next.next;
    ll.head = dummy.next;
    return ll;
}

let tt = deleteNth(LL,2);
tt.print();