import React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface Process {
  id: number;
  arrivalTime: number;
  burstTime: number;
}

interface SchedulingGanttChartProps {
  processes: Process[];
}

export const SchedulingGanttChart: React.FC<SchedulingGanttChartProps> = ({
  processes,
}) => {
    const [parent,enableAnimations] = useAutoAnimate()
  function FirstComeFirstServe(Processes: Process[]) {
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    const ganttChart = [];
    let currentTime = 0;
    for (let i = 0; i < processes.length; i++) {
      ganttChart.push({
        process: processes[i].id,
        start: Math.max(currentTime, processes[i].arrivalTime),
        end:
          Math.max(currentTime, processes[i].arrivalTime) +
          processes[i].burstTime,
      });
      currentTime = ganttChart[ganttChart.length - 1].end;
    }
    return ganttChart;
  }
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-4">Gantt Chart</h1>
      <div className="flex justify-center mt-4">
        <div ref={parent} className="flex gap-2">
          {FirstComeFirstServe(processes).map((process, index) => (
            <div key={process.process} className="flex flex-col">
              <div className="bg-sky-400 flex items-center justify-center w-20 h-10 rounded-md">
                {process.process}
              </div>
              <div className="flex justify-between w-[120%] -ml-2">
                <div>{process.start}</div>
                <div>{index === processes.length - 1 && process.end}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
