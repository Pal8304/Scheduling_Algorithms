interface Process {
    id: string;
    arrivalTime: number;
    burstTime: number;
}

export function ShortestJobFirstNonPreemptive(Processes: Process[]) {
    const ganttChart = [];
    let currentTime = 0;
    console.log("Processes ", Processes);
    Processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    const processQueue = [];
    let processIndex = 0;
    let completedProcesses = 0;
    while(completedProcesses < Processes.length){
        while(processIndex < Processes.length && currentTime >= Processes[processIndex].arrivalTime){
            processQueue.push(Processes[processIndex]);
            processIndex++;
        }
        if(processQueue.length === 0 && completedProcesses < Processes.length){
            ganttChart.push({
                process: "Idle",
                start: currentTime,
                end: Processes[processIndex].arrivalTime
            });
            currentTime = Processes[processIndex].arrivalTime;
        }
        else{
            processQueue.sort((a, b) => a.burstTime - b.burstTime);
            const process = processQueue.shift();
            if(process === undefined){
                break;
            }
            ganttChart.push({
                process: process.id,
                start: currentTime,
                end: currentTime + process.burstTime
            });
            currentTime += process.burstTime;
            completedProcesses++;
        }
    }
    return ganttChart;
}