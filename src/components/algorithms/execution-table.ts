interface Process{
    id: string;
    arrivalTime: number;
    burstTime: number;
    completionTime: number;
    turnaroundTime: number;
    waitingTime: number;
}

interface ExecutionTableProps {
    ganttChart?: { process: string, start: number, end: number }[];
    originalProcesses?: { id: string, arrivalTime: number, burstTime: number }[];
}

export function ExecutionTable({ ganttChart = [], originalProcesses= [] }: ExecutionTableProps) {
    console.log("Gantt Chart: ", ganttChart);
    console.log("Original Processes: ", originalProcesses);
    const processes:Process[] = [];
    let currentTime = 0;
    for (let i = 0; i < ganttChart.length; i++) {
        const process = ganttChart[i];
        if (process.process !== "Idle") {
            const processIndex = processes.findIndex((p) => p.id === process.process);
            if (processIndex === -1) {
                processes.push({
                    id: process.process,
                    arrivalTime: originalProcesses.find((p) => p.id === process.process)?.arrivalTime || 0,
                    burstTime: originalProcesses.find((p) => p.id === process.process)?.burstTime || 0,
                    completionTime: process.end,
                    turnaroundTime: process.end - currentTime,
                    waitingTime: currentTime - process.start
                });
            } else {
                processes[processIndex].completionTime = process.end;
                processes[processIndex].turnaroundTime = process.end - processes[processIndex].arrivalTime;
                processes[processIndex].waitingTime = processes[processIndex].arrivalTime - processes[processIndex].arrivalTime;
            }
        }
        currentTime = process.end;
    }
    for(let i = 0; i < processes.length; i++){
        processes[i].turnaroundTime = processes[i].completionTime - processes[i].arrivalTime;
        processes[i].waitingTime = processes[i].turnaroundTime - processes[i].burstTime;
    }
    console.log("Execution Table: ", processes);
    return processes;
}