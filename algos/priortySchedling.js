function priorityScheduling(processes) {
    let n = processes.length;
    let completionTime = new Array(n).fill(0);
    let turnaroundTime = new Array(n).fill(0);
    let waitingTime = new Array(n).fill(0);
    let executionSequence = [];
    let remainingProcesses = [...processes];

    let currentTime = 0;
    console.log("\nExecution Order with Time Spent:");

    while (remainingProcesses.length > 0) {
        // Find the process with the highest priority that has already arrived
        let availableProcesses = remainingProcesses.filter(p => p.arrivalTime <= currentTime);
        
        if (availableProcesses.length === 0) {
            // If no process has arrived yet, fast forward time
            let nextArrival = Math.min(...remainingProcesses.map(p => p.arrivalTime));
            console.log(`Time ${currentTime} - ${nextArrival}: CPU Idle`);
            currentTime = nextArrival;
            continue;
        }

        // Sort available processes by priority (lower number = higher priority)
        // If priority is the same, sort by arrival time
        availableProcesses.sort((a, b) => a.priority - b.priority || a.arrivalTime - b.arrivalTime);
        
        let process = availableProcesses[0]; // Pick the highest priority process
        executionSequence.push(`P${process.pid}(${process.burstTime}ms)`);

        console.log(`Time ${currentTime} - ${currentTime + process.burstTime}: P${process.pid} executed for ${process.burstTime} ms`);

        currentTime += process.burstTime;
        completionTime[process.pid] = currentTime;
        turnaroundTime[process.pid] = completionTime[process.pid] - process.arrivalTime;
        waitingTime[process.pid] = turnaroundTime[process.pid] - process.burstTime;

        // Remove the executed process
        remainingProcesses = remainingProcesses.filter(p => p.pid !== process.pid);
    }

    // Print Results
    console.log("\nPID  AT  BT  P  CT  TAT  WT");
    for (let process of processes) {
        let pid = process.pid;
        console.log(
            `${pid.toString().padEnd(3)} ${process.arrivalTime.toString().padEnd(3)} ${process.burstTime.toString().padEnd(3)} ${process.priority.toString().padEnd(3)} ${completionTime[pid].toString().padEnd(3)} ${turnaroundTime[pid].toString().padEnd(3)} ${waitingTime[pid].toString().padEnd(3)}`
        );
        
    }

    // Print Execution Sequence
    console.log("\nExecution Sequence:");
    console.log(executionSequence.join(" → "));
}

// Example Processes [ PID, Arrival Time, Burst Time, Priority ]
const processes = [
    { pid: 1, arrivalTime: 2, burstTime: 5, priority: 2 },
    { pid: 2, arrivalTime: 0, burstTime: 3, priority: 1 },
    { pid: 3, arrivalTime: 4, burstTime: 8, priority: 3 },
    { pid: 4, arrivalTime: 1, burstTime: 6, priority: 2 },
];

priorityScheduling(processes);
