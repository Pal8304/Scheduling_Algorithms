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

interface Process {
  id: number;
  arrivalTime: number;
  burstTime: number;
}

interface ProcessDisplayProps {
  processes: Process[];
}

export const ProcessDisplay: React.FC<ProcessDisplayProps> = ({
  processes,
}) => {
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
      <Button className="w-50 mt-4" variant={"default"}>
        Start Simulation
      </Button>
    </div>
  );
};
