import React from "react";

interface Process {
  id: number;
  arrivalTime: number;
  burstTime: number;
}

interface ProcessDisplayProps {
  processes: Process[];
}

export const ProcessDisplay: React.FC<ProcessDisplayProps> = ({ processes }) => {
  return (
    <div>
        {processes.map((process) => (
          <div key={process.id} className="grid grid-cols-3 gap-4">
            <div>{process.id}</div>
            <div>{process.arrivalTime}</div>
            <div>{process.burstTime}</div>
          </div>
        ) )}
    </div>
  );
};