import React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { FirstComeFirstServe } from "./algorithms/first-come-first-serve";
import { ShortestJobFirstPreemptive } from "./algorithms/shortest-job-first-premptive";
import { ShortestJobFirstNonPreemptive } from "./algorithms/shortest-job-first-non-premptive";

interface Process {
  id: string;
  arrivalTime: number;
  burstTime: number;
}

interface SchedulingGanttChartProps {
  processes: Process[];
  schedulingAlgorithm: string;
}

export const SchedulingGanttChart: React.FC<SchedulingGanttChartProps> = ({
  processes, schedulingAlgorithm
}) => {
  const [parent, enableAnimations] = useAutoAnimate();
  let scheduledProcesses;
    switch (schedulingAlgorithm) {
        case "fcfs":
        scheduledProcesses = FirstComeFirstServe(processes);
        break;
        case "sjf-p":
        scheduledProcesses = ShortestJobFirstPreemptive(processes);
        break;
        case "sjf-np":
        scheduledProcesses = ShortestJobFirstNonPreemptive(processes);
        break;
        default:
        throw new Error("Invalid Scheduling Algorithm" + schedulingAlgorithm);
    }
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-4">Gantt Chart</h1>
      <div className="flex justify-center mt-4">
        <div ref={parent} className="flex ">
          {scheduledProcesses.map((process, index) => (
            <div
              key={index}
              className={`text-center w-20 h-15 flex flex-col items-center justify-center rounded-md ${
                process.process === "Idle"
                  ? "bg-inherit text-white border-2 border-white"
                  : "bg-white text-black"
              }`}
              style={{
                width: `${2 * (process.end - process.start)}rem`,
              }}
            >
              {process.process}
              <div className="flex flex-row justify-between text-xs w-full px-1 opacity-0 hover:opacity-100">
                <div>{process.start}</div>
                <div>{process.end}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
