import React from "react";

import { ProcessExecutionTable } from "./process-execution-table";

import { FirstComeFirstServe } from "./algorithms/first-come-first-serve";
import { ShortestJobFirstPreemptive } from "./algorithms/shortest-job-first-premptive";
import { ShortestJobFirstNonPreemptive } from "./algorithms/shortest-job-first-non-premptive";
import { RoundRobin } from "./algorithms/round-robin";
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
  processes,
  schedulingAlgorithm,
}) => {
  // const [parent, enableAnimations] = useAutoAnimate();
  console.log("Processes in scheduling-gant-chart.tsx", processes);
  const [hoveredonProcess, setHoveredonProcess] = React.useState<string>("");
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
    case "round-robin":
      scheduledProcesses = RoundRobin(processes, 2);
      break;
    default:
      throw new Error("Invalid Scheduling Algorithm" + schedulingAlgorithm);
  }
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-4">Gantt Chart</h1>
      <div className="flex justify-center mt-4">
        <div className="flex ">
          {scheduledProcesses.map((process, index) => (
            <div
              key={index}
              className={`text-center w-20 h-16 flex flex-col items-center justify-center rounded-md ${
                process.process === "Idle"
                  ? "bg-inherit text-white border-2 border-white"
                  : "bg-white text-black"
              }`}
              style={{
                width: `${2 * (process.end - process.start)}rem`,
              }}
              onMouseEnter={() => setHoveredonProcess(process.process)}
              onMouseLeave={() => setHoveredonProcess("")}
            >
              {process.process}
              {hoveredonProcess === process.process && (
                <div className="flex flex-row justify-between text-xs w-full px-1">
                  <div>{process.start}</div>
                  <div>{process.end}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <ProcessExecutionTable
          ganttChart={scheduledProcesses}
          originalProcesses={processes}
        />
      </div>
    </div>
  );
};
