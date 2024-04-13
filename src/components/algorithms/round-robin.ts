interface Process {
    id: string;
    arrivalTime: number;
    burstTime: number;
}
// Round Robin Scheduling Algorithm need to be changed 
export function RoundRobin(Processes: Process[], quantum: number) {
    const ganttChart = [];
    let currentTime = 0;
    let processIndex = 0;
    let completedProcesses = 0;
    let processQueue = [];
    let timeQuantum = quantum;
    while (completedProcesses < Processes.length) {
        if (processQueue.length === 0) {
            processQueue.push(Processes[processIndex]);
            processIndex++;
        }
        while (processIndex < Processes.length && currentTime >= Processes[processIndex].arrivalTime) {
            processQueue.push(Processes[processIndex]);
            processIndex++;
        }
        const process = processQueue.shift();
        if (currentTime < process.arrivalTime) {
            ganttChart.push({
                process: "Idle",
                start: currentTime,
                end: process.arrivalTime
            });
            currentTime = process.arrivalTime;
        }
        ganttChart.push({
            process: process.id,
            start: currentTime,
            end: currentTime + Math.min(timeQuantum, process.burstTime)
        });
        currentTime += Math.min(timeQuantum, process.burstTime);
        process.burstTime -= timeQuantum;
        if (process.burstTime <= 0) {
            completedProcesses++;
        }
        else {
            processQueue.push(process);
        }
    }
    return ganttChart;
}