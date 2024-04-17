interface Process {
  id: string;
  arrivalTime: number;
  burstTime: number;
}

export function ShortestJobFirstPreemptive(Processes: Process[]) {
  const ganttChart = [];
  let currentTime = 0;
  let processIndex = 0;
  let completedProcesses = 0;
  const processQueue = [];
  console.log("Processes ", Processes);
  Processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
  console.log("Processes after ", Processes);
  const ProcessesCopy = Processes.map(process => ({...process}));
  console.log("ProcessesCopy ", ProcessesCopy);
  for(let i = 0; i < ProcessesCopy.length;i++){
    console.log("ProcessesCopy ", ProcessesCopy[i]);
  }
  while(completedProcesses < ProcessesCopy.length){
    while(processIndex < ProcessesCopy.length && currentTime >= ProcessesCopy[processIndex].arrivalTime && completedProcesses < ProcessesCopy.length){
      processQueue.push(ProcessesCopy[processIndex]);
      processIndex++;
    }
    if(completedProcesses === ProcessesCopy.length){
        break;
    }
    if(processQueue.length === 0){
        if(ganttChart.length === 0){
            ganttChart.push({
                process: "Idle",
                start: currentTime,
                end: currentTime + 1
            });
        }
        else{
            if(ganttChart[ganttChart.length - 1].process !== "Idle"){
                ganttChart.push({
                    process: "Idle",
                    start: currentTime,
                    end: currentTime + 1
                });
            }
            else{
                ganttChart[ganttChart.length - 1].end++;
            }
        }
    }
    else{
        //console.log("processQueue ", processQueue);
        processQueue.sort((a : Process, b : Process) => a.burstTime - b.burstTime);
        const process: Process | undefined = processQueue.shift();
        if(process === undefined){
            break;
        }
        if(ganttChart.length > 0 && ganttChart[ganttChart.length - 1].process === process.id){
            ganttChart[ganttChart.length - 1].end++;
        }
        else{
            ganttChart.push({
                process: process.id,
                start: currentTime,
                end: currentTime + 1
            });
        }
        process.burstTime--;
        if(process.burstTime <= 0){
            completedProcesses++;
            if(completedProcesses === ProcessesCopy.length){
                break;
            }
        }
        else{
            processQueue.push(process);
        }
    }
    currentTime++;
  }
    return ganttChart;
}
