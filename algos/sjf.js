function sjfScheduling(processes) {
    let n = processes.length;
    let completionTime = new Array(n).fill(0);
    let turnaroundTime = new Array(n).fill(0);
    let waitingTime = new Array(n).fill(0);
    let executionSequence = [];
    
    // Sort by Arrival Time initially
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    let currentTime = 0;
    let completed = 0;
    let visited = new Array(n).fill(false);

    while (completed < n) {
        let idx = -1;
        let minBurstTime = Infinity;

        // Find process with the shortest burst time among arrived processes
        for (let i = 0; i < n; i++) {
            if (!visited[i] && processes[i].arrivalTime <= currentTime) {
                if (processes[i].burstTime < minBurstTime) {
                    minBurstTime = processes[i].burstTime;
                    idx = i;
                }
            }
        }

        if (idx === -1) {
            // If no process is available, CPU remains idle
            executionSequence.push(`Idle`);
            currentTime++;
        } else {
            let { pid, arrivalTime, burstTime } = processes[idx];

            executionSequence.push(`P${pid}`);
            completionTime[idx] = currentTime + burstTime;
            turnaroundTime[idx] = completionTime[idx] - arrivalTime;
            waitingTime[idx] = turnaroundTime[idx] - burstTime;

            currentTime = completionTime[idx]; // Move time forward
            visited[idx] = true;
            completed++;
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
    { pid: 1, arrivalTime: 0, burstTime: 8 },
    { pid: 2, arrivalTime: 1, burstTime: 4 },
    { pid: 3, arrivalTime: 2, burstTime: 2 },
    { pid: 4, arrivalTime: 3, burstTime: 1 },
];

sjfScheduling(processes);
