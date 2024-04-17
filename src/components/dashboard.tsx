import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ProcessInsert } from "@/components/process-insert";
import { ProcessDisplay } from "@/components/process-display";
interface Process {
  id: string;
  arrivalTime: number;
  burstTime: number;
}

export const Dashboard: React.FC = () => {
  const [schedulingAlgorithm, setSchedulingAlgorithm] = useState<string>("");
  const [processes, setProcesses] = useState<Process[]>([]);

  const addProcess = (process: Process) => {
    setProcesses([...processes, process]);
    // console.log(processes);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center">Scheduling Algorithms</h1>
      <div className="flex flex-col">
        <div className="flex justify-center mt-8 gap-4">
          <div>
            <Select
              onValueChange={(value) => {
                setSchedulingAlgorithm(value);
              }}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a scheduling algoritm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fcfs">First-Come, First-Served </SelectItem>
                <SelectItem value="sjf-p">
                  Shortest Job First Pre-emptive
                </SelectItem>
                <SelectItem value="sjf-np">
                  Shortest Job First Non Pre-emptive{" "}
                </SelectItem>
                <SelectItem value="priority-p">
                  Priority Schedule Algorithm Pre-emptive
                </SelectItem>
                <SelectItem value="priority-np">
                  Priority Schedule Algorithm Non Pre-emptive
                </SelectItem>
                <SelectItem value="round-robin">Round Robin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            {schedulingAlgorithm === "fcfs" ? (
              <ProcessInsert addProcess={addProcess}/>
            ) : schedulingAlgorithm === "sjf-p" ? (
              <ProcessInsert addProcess={addProcess} />
            ) : schedulingAlgorithm === "sjf-np" ? (
              <ProcessInsert addProcess={addProcess} />
            ) : schedulingAlgorithm === "priority-p" ? (
              <ProcessInsert addProcess={addProcess} />
            ) : schedulingAlgorithm === "priority-np" ? (
              <ProcessInsert addProcess={addProcess} />
            ) : schedulingAlgorithm === "round-robin" ? (
              <ProcessInsert addProcess={addProcess} />
            ) : (
              <div></div>
            )}
          </div>
        </div>
        {
            processes.length > 0 ? 
            <div>
                <ProcessDisplay processes={processes} schedulingAlgorithm={schedulingAlgorithm} />
            </div>
            : <div></div>
        }
      </div>
    </div>
  );
};
