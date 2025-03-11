const { parentPort } = require("worker_threads");

parentPort.on("message", (data) => {
    if (data.type === "consume" && data.buffer.length > 0) {
        let item = data.buffer[0]; // Consume first available item
        parentPort.postMessage({ type: "consumed", item });
        setTimeout(() => parentPort.postMessage({ type: "consume", buffer: data.buffer }), 2000); // Consume every 2 sec
    }
});
