interface Process {
    id: number;
    arrivalTime: number;
    burstTime: number;
    priority: number;
}

export function PriorityScheduleAlgorithmNonPreemtive(Processes: Process[]) {
    return Processes;
}