function fcfsScheduling(processes) {
    let n = processes.length;
    let completionTime = new Array(n).fill(0);
    let turnaroundTime = new Array(n).fill(0);
    let waitingTime = new Array(n).fill(0);
    let executionSequence = [];

    // Sort processes by arrival time (if not already sorted)
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    // Calculate Completion Time and store execution sequence
    let currentTime = 0;
    for (let i = 0; i < n; i++) {
        let { pid, arrivalTime, burstTime } = processes[i];

        if (currentTime < arrivalTime) {
            executionSequence.push(`Idle (${arrivalTime - currentTime}s)`);
            currentTime = arrivalTime; // CPU stays idle
        }

        executionSequence.push(`P${pid}`); // Add process to sequence

        completionTime[i] = currentTime + burstTime;
        turnaroundTime[i] = completionTime[i] - arrivalTime;
        waitingTime[i] = turnaroundTime[i] - burstTime;

        currentTime = completionTime[i]; // Move current time forward
    }

    // Print results
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
    { pid: 1, arrivalTime: 0, burstTime: 4 },
    { pid: 2, arrivalTime: 1, burstTime: 3 },
    { pid: 3, arrivalTime: 2, burstTime: 1 },
    { pid: 4, arrivalTime: 6, burstTime: 2 }, // A gap (idle) before P4
];

fcfsScheduling(processes);
