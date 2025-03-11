function roundRobinScheduling(processes, timeQuantum) {
    let n = processes.length;
    let completionTime = new Array(n).fill(0);
    let turnaroundTime = new Array(n).fill(0);
    let waitingTime = new Array(n).fill(0);
    let remainingBurstTime = processes.map(p => p.burstTime);
    let executionSequence = [];

    let currentTime = 0;
    let queue = [];
    let visited = new Array(n).fill(false);

    // Sort processes by arrival time initially
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    
    // Enqueue first process that arrives at time 0
    queue.push(0);
    visited[0] = true;

    console.log("\nExecution Order with Time Spent:");

    while (queue.length > 0) {
        let index = queue.shift(); // Get the front process
        let { pid, arrivalTime } = processes[index];
        let executionTime = Math.min(timeQuantum, remainingBurstTime[index]);

        executionSequence.push(`P${pid}(${executionTime}ms)`);
        console.log(`Time ${currentTime} - ${currentTime + executionTime}: P${pid} executed for ${executionTime} ms`);

        currentTime += executionTime;
        remainingBurstTime[index] -= executionTime;

        // If process finishes execution
        if (remainingBurstTime[index] === 0) {
            completionTime[index] = currentTime;
            turnaroundTime[index] = completionTime[index] - arrivalTime;
            waitingTime[index] = turnaroundTime[index] - processes[index].burstTime;
        }

        // Check for new processes that have arrived and add them to queue
        for (let i = 0; i < n; i++) {
            if (!visited[i] && processes[i].arrivalTime <= currentTime) {
                queue.push(i);
                visited[i] = true;
            }
        }

        // Re-add current process if it's not finished
        if (remainingBurstTime[index] > 0) {
            queue.push(index);
        }
    }

    // Print Results
    console.log("\nPID  AT  BT  CT  TAT  WT");
    for (let i = 0; i < n; i++) {
        let { pid, arrivalTime, burstTime } = processes[i];
        console.log(
            `${pid.toString().padEnd(3)} ${arrivalTime.toString().padEnd(3)} ${burstTime.toString().padEnd(3)} ${completionTime[i].toString().padEnd(3)} ${turnaroundTime[i].toString().padEnd(3)} ${waitingTime[i].toString().padEnd(3)}`
        );
    }

    // Print Execution Sequence
    console.log("\nExecution Sequence:");
    console.log(executionSequence.join(" → "));
}

// Example Processes [ PID, Arrival Time, Burst Time ]
const processes = [
    { pid: 1, arrivalTime: 0, burstTime: 5 },
    { pid: 2, arrivalTime: 1, burstTime: 4 },
    { pid: 3, arrivalTime: 2, burstTime: 2 },
    { pid: 4, arrivalTime: 3, burstTime: 1 },
];

const timeQuantum = 2; // Define the time quantum
roundRobinScheduling(processes, timeQuantum);
