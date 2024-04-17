interface Process {
    id: string;
    arrivalTime: number;
    burstTime: number;
}

export function RoundRobin(Processes: Process[], quantum: number) {
    const ganttChart = [];
    let currentTime = 0;
    let processIndex = 0;
    let completedProcesses = 0;
    Processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    const ProcessesCopy = Processes.map(process => ({...process}));
    const processQueue = [];
    console.log("Processes ", Processes);
    while(completedProcesses < Processes.length){
        while(processIndex < Processes.length && currentTime >= Processes[processIndex].arrivalTime){
            processQueue.push(ProcessesCopy[processIndex]);
            processIndex++;
        }
        if(processQueue.length === 0 && completedProcesses < Processes.length){
            if(ganttChart.length > 0 && ganttChart[ganttChart.length - 1].process === "Idle"){
                ganttChart[ganttChart.length - 1].end++;
            }
            else{
                ganttChart.push({
                    process: "Idle",
                    start: currentTime,
                    end: currentTime + 1
                });
            }
            currentTime++;
        }
        else{
            const process: Process | undefined = processQueue.shift();
            if(!process){
                break;
            }
            if(process.burstTime > quantum){
                if(ganttChart.length > 0 && ganttChart[ganttChart.length - 1].process === process.id){
                    ganttChart[ganttChart.length - 1].end += quantum;
                }
                else{
                    ganttChart.push({
                        process: process.id,
                        start: currentTime,
                        end: currentTime + quantum
                    });
                }
                process.burstTime -= quantum;
                currentTime += quantum;
                processQueue.push(process);
            }
            else{
                if(ganttChart.length > 0 && ganttChart[ganttChart.length - 1].process === process.id){
                    ganttChart[ganttChart.length - 1].end += process.burstTime;
                }
                else{
                    ganttChart.push({
                        process: process.id,
                        start: currentTime,
                        end: currentTime + process.burstTime
                    });
                }
                currentTime += process.burstTime;
                completedProcesses++;
            }
        }
        console.log("processQueue ", processQueue);
        console.log("currentTime ", currentTime);
    }
    return ganttChart;
}