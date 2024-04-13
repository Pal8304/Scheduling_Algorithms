interface Process {
    id: string;
    arrivalTime: number;
    burstTime: number;
}

export function ShortestJobFirstNonPreemptive(Processes: Process[]) {
    const ganttChart = [];
    let currentTime = 0;
    Processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    const processQueue = [];
    let processIndex = 0;
    let completedProcesses = 0;
    while(completedProcesses < Processes.length){
        if(processQueue.length === 0){
            processQueue.push(Processes[processIndex]);
            processIndex++;
        }
        while(processIndex < Processes.length && currentTime < Processes[processIndex].arrivalTime){
            processQueue.push(Processes[processIndex]);
            processIndex++;
        }
        processQueue.sort((a, b) => a.burstTime - b.burstTime);
        const process = processQueue.shift();
        if(currentTime < process.arrivalTime){
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
            end: currentTime + process.burstTime
        });
        currentTime += process.burstTime;
        completedProcesses++;
    }
    return ganttChart;
}