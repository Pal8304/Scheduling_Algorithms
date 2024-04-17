interface Process {
    id: number;
    arrivalTime: number;
    burstTime: number;
    priority: number;
}

export function PriorityScheduleAlgorithmPreemptive(Processes : Process[]){
    return Processes;
}