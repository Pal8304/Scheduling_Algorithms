import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ProcessInsert } from "@/components/process-insert";

export const Dashboard: React.FC = () => {
  const [schedulingAlgorithm, setSchedulingAlgorithm] = useState<string>("");
  return (
    <div>
      <h1 className="text-4xl font-bold text-center">Scheduling Algorithms</h1>
      <div className="flex justify-center mt-10">
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
            <ProcessInsert />
          ) : schedulingAlgorithm === "sjf-p" ? (
            <ProcessInsert />
          ) : schedulingAlgorithm === "sjf-np" ? (
            <ProcessInsert />
          ) : schedulingAlgorithm === "priority-p" ? (
            <ProcessInsert />
          ) : schedulingAlgorithm === "priority-np" ? (
            <ProcessInsert />
          ) : schedulingAlgorithm === "round-robin" ? (
            <ProcessInsert />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};
