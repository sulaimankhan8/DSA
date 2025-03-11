/*Prototypal Inheritance in JavaScript – Explanation with Examples
What is Prototypal Inheritance?
Prototypal inheritance is a fundamental concept in JavaScript where objects can inherit properties and methods from other objects. Every JavaScript object has an internal property called [[Prototype]], which refers to another object from which it inherits properties.

This allows JavaScript to create an inheritance chain, known as the prototype chain, enabling objects to reuse methods and properties from other objects without duplicating code.

How Does Prototypal Inheritance Work?
Each object in JavaScript has a prototype
When you create an object, it has an internal reference to a prototype object. This prototype object itself may have a prototype, forming a chain (prototype chain).

Objects inherit from their prototype
If an object does not have a property or method, JavaScript looks up the prototype chain to find it.

JavaScript uses __proto__ or Object.getPrototypeOf()
We can check an object's prototype using __proto__ (deprecated) or Object.getPrototypeOf(object).*/
//-----------------------------------------------------------------------
//BASIC
// Define a parent object
const animal = {
    isAlive:true,
    eat: function(){
        console.log("eating...");
    }
};

const dog=Object.create(animal);
dog.eat();
console.log("-------------------------");
/*Explanation
We created an animal object with properties isAlive and eat().
The dog object is created using Object.create(animal), which means dog inherits from animal.
Although dog does not have its own isAlive property or eat() method, it can access them through the prototype chain.*/
//-----------------------------------------------------------------------
//ADDING NEW PROPERTIES TO PROTOTYPES
const bird=Object.create(animal);
bird.fly=function(){
    console.log("flying" ,this.isAlive);
};

bird.eat();
bird.fly();
console.log("-------------------------");
/*Explanation
We added a fly() method to bird, but it still inherits isAlive and eat() from animal.*/
//-----------------------------------------------------------------------
//Constructor Functions and Prototypes
function Person(name,age){
    this.name=name;
    this.age=age;
}
Person.prototype.greet=function(){
    console.log(`hello my name is ${this.name} and i am ${this.age} years old`);
}
const alice= new Person("alice",20);
const tom= new Person("tom",20);

alice.greet();
tom.greet();

console.log(alice.__proto__ === Person.prototype);
console.log("-------------------------");
/*Explanation
Person is a constructor function that initializes name and age.
Person.prototype.greet is shared by all instances (alice and bob).
The __proto__ of alice points to Person.prototype, enabling access to the greet() method.*/
//-----------------------------------------------------------------------
//Overriding Prototype Methods
const theo=new Person("theo",55);
theo.greet =function(){
    console.log(`my name ${this.name} and i am ${this.age} years young`);
}
theo.greet();
console.log("-------------------------");
/*Explanation
The start() method in Vehicle.prototype is inherited by car.
However, car.start() is overridden with a new method, so it does not use the prototype method.*/
//-----------------------------------------------------------------------
//Using class Syntax (ES6)
class Student {
    constructor(name){
        this.name=name;
    }
    speak(){
        console.log(`my name is ${this.name}`);
    }
}
class S1 extends Student{
    speak(){
        console.log(`my name is ${this.name } and i am in class S1`);
}
}

const rahul= new S1("rahul");


rahul.speak();

/*
Explanation
How JavaScript Resolves rahul.speak() Using the Prototype Chain
JavaScript first checks if rahul has speak as its own property.

rahul is an instance of S1.
speak is not a direct property of rahul.
Since speak is not found on rahul, JavaScript looks up S1.prototype.

S1.prototype has a speak method.
JavaScript executes speak() from S1.prototype.
The search stops here because the method is found.

class Student {
    constructor(name) {
        this.name = name;
    }
}

class S1 extends Student {
}

const rahul = new S1("rahul");
rahul.speak(); // ERROR!
Now, JavaScript resolves rahul.speak() like this:
JavaScript first checks if rahul has speak as its own property.

Not found.
It checks S1.prototype.

Not found.
It checks Student.prototype.

Not found.
It checks Object.prototype.

Not found.
Since speak is not found anywhere, JavaScript throws an error.

Output:

vbnet
Copy
Edit
TypeError: rahul.speak is not a function

rahul → S1.prototype → Student.prototype → Object.prototype → null

//-----------------------------------------------------------------------
