const { parentPort, workerData } = require("worker_threads");

const { bufferSize, totalItems } = workerData;
let producedCount = 0;

// Produce items
function produce() {
    if (producedCount < totalItems) {
        let item = producedCount++;
        parentPort.postMessage({ type: "produced", item });
        setTimeout(produce, 1000);  // Produce every 1 second
    } else {
        parentPort.postMessage({ type: "done" });
    }
}

// Start producing
produce();
