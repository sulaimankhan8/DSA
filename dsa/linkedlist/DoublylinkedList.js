function Node(data){
    this.data=data;
    this.next=null;
    this.prev=null;

}

//-----------------------------------------------------------------------

function DoubleLinkedlist(){
    this.head=null;
}

//-----------------------------------------------------------------------

DoubleLinkedlist.prototype.append = function(data){
    let newNode = new Node(data);
    if(!this.head){
        this.head=newNode;
        return;
    }

    let currentNode = this.head;
    while(currentNode.next){
        currentNode=currentNode.next;
    }
    currentNode.next = newNode;
    newNode.prev=currentNode;

}

let dl= new DoubleLinkedlist();
dl.append(10);
dl.append(20);
dl.append(30);


//-----------------------------------------------------------------------

DoubleLinkedlist.prototype.prepend= function(data){
    let newNode = new Node(data);
    if(!this.head){
        this.head=newNode;
        return;
    }
    newNode.next=this.head;
    this.head.prev=newNode;
    this.head=newNode;
}

dl.prepend(5);



//-----------------------------------------------------------------------


DoubleLinkedlist.prototype.delete= function(value){
    if(!this.head)return;
    let currentNode= this.head;

    if(currentNode.data===value){
        this.head=currentNode.next;
        currentNode.prev=null;
        return;
    }
    while(currentNode && currentNode.data !== value){
        currentNode=currentNode.next;
    }
    if(!currentNode){
        return;
    }
    if(currentNode.next){currentNode.next.prev=currentNode.prev}
    if(currentNode.prev){currentNode.prev.next=currentNode.next}
}
dl.delete(10);

//-----------------------------------------------------------------------


DoubleLinkedlist.prototype.print= function(){
    let current = this.head;
    let result ="";
    while(current){
        result +=current.data + "<>";
        current = current.next;
    }
    console.log(result +"Null");
}
    
dl.print();