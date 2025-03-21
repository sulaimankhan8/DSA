class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class CircularLinkedList {
    constructor() {
        this.head = null;
    }

    append(data) {
        let newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            newNode.next = this.head;
            return;
        }
        let current = this.head;
        while (current.next !== this.head) {
            current = current.next;
        }
        current.next = newNode;
        newNode.next = this.head;
    }

    prepend(data) {
        let newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            newNode.next = this.head;
            return;
        }
        let current = this.head;
        while (current.next !== this.head) {
            current = current.next;
        }
        newNode.next = this.head;
        current.next = newNode;
        this.head = newNode;
    }

    deleteNode(value) {
        if (!this.head) return;
        let current = this.head, prev = null;

        if (current.data === value) {
            while (current.next !== this.head) {
                current = current.next;
            }
            if (this.head.next === this.head) {
                this.head = null;
            } else {
                current.next = this.head.next;
                this.head = this.head.next;
            }
            return;
        }

        prev = this.head;
        current = this.head.next;
        while (current !== this.head) {
            if (current.data === value) {
                prev.next = current.next;
                return;
            }
            prev = current;
            current = current.next;
        }
    }

    printList() {
        if (!this.head) {
            console.log("List is empty");
            return;
        }
        let current = this.head;
        let result = "";
        do {
            result += current.data + " → ";
            current = current.next;
        } while (current !== this.head);
        console.log(result + "(back to head)");
    }
}

let cll = new CircularLinkedList();
cll.append(10);
cll.append(20);
cll.append(30);
cll.prepend(5);
cll.printList(); 
cll.deleteNode(20);
cll.printList(); 


//-----------------------------------------------------------------------

CircularLinkedList.prototype.checkcircle=function(){
    let slow=this.head;
    let fast=this.head;

    while(fast.next !==null && fast !==null){
        slow=slow.next;
        fast=fast.next.next;

        if(slow===fast){console.log("is a cycle" ); return;}
        
    }
    console.log("not a cycle " )
    return ;
}

cll.checkcircle();
cll.printList()