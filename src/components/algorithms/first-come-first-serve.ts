interface Process {
  id: string;
  arrivalTime: number;
  burstTime: number;
}
export function FirstComeFirstServe(Processes: Process[]) {
    Processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    const ganttChart = [];
    let currentTime = 0;
    for (let i = 0; i < Processes.length; i++) {
        const process = Processes[i];
        if(currentTime > process.arrivalTime){
            ganttChart.push({
                process: process.id,
                start: currentTime,
                end: currentTime + process.burstTime
            });
            currentTime += process.burstTime;
        }
        else{
            ganttChart.push({
                process: "Idle",
                start: currentTime,
                end: process.arrivalTime
            })
            ganttChart.push({
                process: process.id,
                start: process.arrivalTime,
                end: process.arrivalTime + process.burstTime
            });
            currentTime = process.arrivalTime + process.burstTime;
        }
    }
    return ganttChart;
}
