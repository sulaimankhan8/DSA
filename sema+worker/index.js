const { Worker } = require("worker_threads");

const buffer = [];
const bufferSize = 5;
const totalItems = 10;

// Create producer and consumer workers
const producerWorker = new Worker("./producer.js", { workerData: { bufferSize, totalItems } });
const consumerWorker = new Worker("./consumer.js");

// Handle producer events
producerWorker.on("message", (data) => {
    if (data.type === "produced") {
        buffer.push(data.item);
        console.log(`Produced: ${data.item}, Buffer: [${buffer}]`);
        consumerWorker.postMessage({ type: "consume", buffer });
    }
});

// Handle consumer events
consumerWorker.on("message", (data) => {
    if (data.type === "consumed") {
        buffer.shift();  // Remove the first item in buffer after consumption
        console.log(`Consumed: ${data.item}, Buffer: [${buffer}]`);
    }
});

// Handle errors
producerWorker.on("error", (err) => console.error("Producer Error:", err));
consumerWorker.on("error", (err) => console.error("Consumer Error:", err));
