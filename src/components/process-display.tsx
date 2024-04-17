import React from "react";

import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import { SchedulingGanttChart } from "./scheduling-gantt-chart";

interface Process {
  id: string;
  arrivalTime: number;
  burstTime: number;
}

interface ProcessDisplayProps {
  processes: Process[];
  schedulingAlgorithm: string;
}

export const ProcessDisplay: React.FC<ProcessDisplayProps> = ({
  processes,
  schedulingAlgorithm,
}) => {
  const [simulationBegin, setSimulationBegin] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-center mt-4">Processes</h1>
      <div>
        <Table>
          {/* <TableCaption>Processes</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">
                Process ID
              </TableHead>
              <TableHead>
                Arrival Time
              </TableHead>
              <TableHead>
                Burst Time
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {processes.map((process) => (
              <TableRow key={process.id}>
                <TableCell className="text-center font-medium">{process.id}</TableCell>
                <TableCell className="text-center font-medium">{process.arrivalTime}</TableCell>
                <TableCell className="text-center font-medium">{process.burstTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Button className="w-50 mt-4" variant={"default"}
        onClick={() => setSimulationBegin(true)}
      >
        Start Simulation
      </Button>
      {
        simulationBegin && <SchedulingGanttChart processes={processes} schedulingAlgorithm={schedulingAlgorithm} />
      }
    </div>
  );
};
