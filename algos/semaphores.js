function Semaphore(count) {
        this.count = count;
        this.queue = [];   
}
Semaphore.prototype.acquire = async function() {
    if (this.count > 0) {
        this.count--;
    } else {
        await new Promise(resolve => this.queue.push(resolve));
    }
};
Semaphore.prototype.release = function() {
    if (this.queue.length > 0) {
        this.queue.shift()();
    } else {
        this.count++;
    }
};
// Shared Variables
const buffer = [];
const BUFFER_SIZE = 5;
const TOTAL_ITEMS = 10;
const empty = new Semaphore(BUFFER_SIZE); // Available slots
const full = new Semaphore(0); // Filled slots
const mutex = new Semaphore(1); // Mutual exclusion

async function producer() {
    for (let i = 0; i < TOTAL_ITEMS; i++) {
        await empty.acquire(); 
        await mutex.acquire();

        buffer.push(i);
        console.log(`Produced: ${i} | Buffer: [${buffer}]`);

        mutex.release(); 
        full.release(); 
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate production time
    }
}

async function consumer() {
    for (let i = 0; i < TOTAL_ITEMS; i++) {
        await full.acquire(); 
        await mutex.acquire();

        let item = buffer.shift();
        console.log(`Consumed: ${item} | Buffer: [${buffer}]`);

        mutex.release(); 
        empty.release(); 
        await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate consumption time
    }
}

// Run both producer and consumer
async function start() {
    await Promise.all([producer(), consumer()]);
}

start();
